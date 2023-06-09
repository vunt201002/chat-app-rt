const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config({ path: '../config.env' });

const sendNodeMailer = async({
    to,
    sender,
    subject,
    html,
    attachments,
    text,
}) => {
    try {
        let config = {
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        };

        let transporter = nodemailer.createTransport(config);

        let message = {
            from: process.env.EMAIL, // sender address
            to: to, // list of receivers
            subject: subject, // Subject line
            html: html, // html body
        };

        return transporter.sendMail(message);
    } catch (err) {
        console.log(err);
    }
}

exports.sendEmail = async (args) => {
    if (!process.env.NODE_ENV === "development") {
      return Promise.resolve();
    } else {
      return sendNodeMailer(args);
    }
};