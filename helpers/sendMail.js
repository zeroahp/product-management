const nodemailer = require('nodemailer');


module.exports.sendMail = (email, subject, html) => {
    
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_ID,
            pass: process.env.EMAIL_PASSWORD,
        }
    });

    const mailOptions = {
        from:  process.env.EMAIL_ID,
        to: email,
        subject: subject,
        html: html,
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            // do something useful
        }
    });
}