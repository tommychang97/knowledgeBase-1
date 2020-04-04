'use strict';

const mailer = require('nodemailer');

const testAccount = mailer.createTestAccount();

let transporter = mailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
    },
});

const nodemailer = {
    sendMail: (from, to, subject, text, html) => {
        transporter
            .sendMail({
                from,
                to,
                subject,
                text,
                html: `<div>${text}</div>`,
            })
            .then((res) => {
                console.log('Sent mail was: ', res);
            });
    },
};

module.exports = nodemailer;
