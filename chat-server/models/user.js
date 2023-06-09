const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
    },
    avatar: {
        type: String
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        validate: {
            validator: function (email) {
                return String(email)
                    .toLowerCase()
                    .match(
                        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
                    );
            },
            message: (prop) => `"Email (${prop.value}) is invalid"`,
        },
    },
    password: {
        // unselect
        type: String,
    },
    passwordConfirm: {
        // unselect
        type: String,
    },
    passwordChangedAt: {
        // unselect
        type: Date,
    },
    passwordResetToken: {
        // unselect
        type: String,
    },
    passwordResetExpires: {
        // unselect
        type: Date,
    },

    createdAt: {
        type: Date,
    },
    updatedAt: {
        // unselect
        type: Date,
    },
    verified: {
        type: Boolean,
        default: false,
    },
    otp: {
        type: Number,
    },
    otp_expiry_time: {
        type: Date,
    },
});

userSchema.pre("save", async function (next) {
    // Only run this function if password was actually modified
    if (!this.isModified("otp") || !this.otp) return next();
  
  
    // Hash the otp with cost of 12
    this.otp = await bcrypt.hash(this.otp.toString(), 12);
    
    // ERROR: Cannot hash the otp
    console.log(this.otp.toString(), "FROM PRE SAVE HOOK")
  
    next();
}); 

userSchema.pre("save", async function (next) {
    // Only run this function if password was actually modified
    if (!this.isModified("password") || !this.password) return next();
  
    // Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);
  
    //! Shift it to next hook // this.passwordChangedAt = Date.now() - 1000;
  
    next();
});

userSchema.pre('save', function(next) {
    if (!this.isModified('password') || this.isNew || !this.password) return next();
  
    this.passwordChangedAt = Date.now() - 1000;
    next();
});

userSchema.methods.correctPassword = async function(
    candidatePassword,
    userPassword
) {
    return await bcrypt.compare(
        candidatePassword,
        userPassword
    );
};

userSchema.methods.correctOTP = async function(
    candidateOTP,
    userOTP
) {
    // return await bcrypt.compare(
    //     candidateOTP,
    //     userOTP
    // );

    // FIX AFTER ERROR: cannot hash the otp, fix this and modify this
    // function
    return candidateOTP == userOTP;
};

userSchema.methods.changedPasswordAfter = function (JWTTimeStamp) {
    if (this.passwordChangedAt) {
        const changedTimeStamp = parseInt(
            this.passwordChangedAt.getTime() / 1000,
            10
        );
        return JWTTimeStamp < changedTimeStamp;
    }
  
    // FALSE MEANS NOT CHANGED
    return false;
};

userSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex');

    this.passwordResetToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    this.passwordResetExpires = Date.now() + 10*60*100; // 10min

    return resetToken;
};

const User = new mongoose.model("User", userSchema);
module.exports = User;
