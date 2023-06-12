const jwt = require('jsonwebtoken');
const otpGenerator = require('otp-generator');
const crypto = require('crypto');
const dotenv = require('dotenv');

const { promisify } = require('util');
const filterObj = require('../utils/filterObject');
const otp = require('../Templates/Mail/otp');
const resetPassword = require('../Templates/Mail/resetPassword');
const AppError = require('../utils/AppError');

// models
const User = require('../models/user');
const mailService = require('../services/mailer');

dotenv.config({ path: '../config.env' });

// this function will return you jwt token
const signToken = (userId) => {
    return jwt.sign(
        { userId },
        process.env.JWT_SECRET
    );
};

// register user
exports.register = async (req, res, next) => {
    const {
        firstName,
        lastName,
        email,
        password,
    } = req.body;

    const filterBody = filterObj(req.body, 'firstName', 'lastName', 'password', 'email');

    // check if a verified user with given email exists
    const existingUser = await User.findOne({ email: email });

    if (existingUser && existingUser.verified) {
        // user with this email already exists
        return res.status(400).json({
            status: "error",
            message: "Email is already in use."
        });
    } else if (existingUser) {
        // if not verified than update prev one
        const updatedUser = await User.findOneAndUpdate(
            {
                email: email
            }, 
            {
                filterBody
            },
            {
                new: true,
                validateModifiedOnly: true,
            }
        );
        // generate otp and send to email
        req.userId = existingUser._id;
        next();
    } else {
        // if user is not created before than create a new one
        const newUser = await User.create(filterBody);

        // generate an otp and send to email
        req.userId = newUser._id;
        next();
    }
};

exports.sendOTP = async (req, res, next) => {
    const { userId } = req;
    
    const new_otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        specialChars: false,
        lowerCaseAlphabets: false,
    });

    const otp_expiry_time = Date.now() + 10 * 60 * 1000; // 10 Mins after otp is sent

    const user = await User.findByIdAndUpdate(userId, {
        otp_expiry_time: otp_expiry_time,
    });

    user.otp = new_otp.toString();

    await user.save({ new: true, validateModifiedOnly: true });

    console.log(new_otp);

    // send email to user
    mailService
        .sendEmail({
            // from: 'khsnbc958@gmail.com',
            to: user.email,
            subject: "Verification OTP",
            html: otp(user.firstName, new_otp),
        })
        // .then(() => {

        // })
        // .catch((err) => {
        //     console.log(err);
        // });
    
    return res.status(200).json({
        status: "success",
        message: "otp send successfully"
    });

};

exports.verifyOTP = async (req, res, next) => {
    // verify otp and update user record acordingly

    const { email, otp } = req.body;

    const user = await User.findOne(
        {
            email: email,
            otp_expiry_time: {
                $gt: Date.now()
            },
        }
    );
    console.log(user);
    if (!user) {
        return res.status(400).json({
            status: "error",
            message: "Email is invalid or otp expire"
        });
    }

    if (user.verified) {
        return res.status(400).json({
            status: "error",
            message: "Email is already verified",
        });
    }

    if (!await user.correctOTP(otp, user.otp)) {
        return res.status(400).json({
            status: "error",
            message: "otp is incorrect",
            token
        });
    }

    // otp is correct
    user.verified = true;
    user.otp = undefined;

    await user.save({ new: true, validateModifiedOnly: true });

    const token = signToken(user._id);

    console.log(token);

    return res.status(200).json({
        status: 'success',
        message: 'otp verified successfully',
        token,
    });
};

// login user
exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            status: 'error',
            message: 'both email and password are required'
        });
    }

    const userDoc = await User.findOne({ email: email }).select('+password');

    if (!userDoc || !userDoc.password) {
        return res.status(400).json({
            status: "error",
            message: "Incorrect password",
        });
    }

    if (!userDoc || !(await userDoc.correctPassword(password, userDoc.password))) {
        return res.status(400).json({
            status: 'error',
            message: 'Email or password is incorrect'
        });
    }

    const token = signToken(userDoc._id);

    return res.status(200).json({
        status: 'success',
        message: 'Logged in successfully',
        token,
    });
};

exports.protect = async (req, res, next) => {
    // getting jwt token and check
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];

    } else if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }

    if (!token) {
        return next(
            new AppError(`You are not logged in! Please log in to get access.`, 401)
        );
    }

    // verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // check if user still exist
    const thisUser = await User.findById(decoded.userId);
    console.log(token, decoded.userId);
    if (!thisUser) {
        return next(
            new AppError(
              "The user belonging to this token does no longer exists.",
              401
            )
        );
    }

    // check if user change the password after token was issued
    if (thisUser.changedPasswordAfter(decoded.iat)) {
        return next(
            new AppError("User recently changed password! Please log in again.", 401)
        );
    }

    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = thisUser;
    next();
};

exports.forgotPassword = async (req, res, next) => {
    // Get user based on POSTed email
    const user = await User.findOne({ email: req.body.email });
    
    if (!user) {
        return next(new AppError("There is no user with email address.", 404));
    }

    // generate the random reset token
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });
    
    // send email with reset url
    try {
        const resetUrl = `http://localhost:3000/auth/reset-password/?token=${resetToken}`;
        // TODO: Send Email with this Reset URL to user's email address

        mailService
            .sendEmail({
                // from: "@gmail.com",
                to: user.email,
                subject: "Reset Password",
                html: resetPassword(user.firstName, resetUrl),
            })
            // .then(() => {

            // })
            // .catch((err) => {
            //     console.log(err);
            // });

        console.log(resetToken);

        return res.status(200).json({
            status: 'success',
            message: 'Token sent to email'
        });

    } catch (err) {
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;

        await user.save({ validateBeforeSave: true });

        return next (
            new AppError("There was an error sending the email. Try again later!"),
            500
        );
    }
};

exports.resetPassword = async (req, res, next) => {
    // get user based on token
    const hanshedToken = crypto
        .createHash('sha256')
        .update(req.body.token)
        .digest('hex');
    
    const user = await User.findOne({
        passwordResetToken: hanshedToken,
        passwordResetExpires: {$gt: Date.now()},
    });

    // if token has expire or submisson user is out of time window
    if (!user) {
        return next(new AppError("Token is invalid or has expired", 400));
    }

    // update user password and reset token
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;

    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();

    // Log in the user and send new jwt

    // send email to user

    const token = signToken(user._id);

    return res.status(200).json({
        status: 'success',
        message: 'Password reset successfully'
    });
};
