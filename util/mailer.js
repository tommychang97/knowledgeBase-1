'use strict';

const mailer = require('nodemailer');

const testAccount = mailer.createTestAccount();

let transporter = mailer.createTransport({
    // port: 25,
    // host: 'localhost',
    // tls: {
    //   rejectUnauthorized: false
    // },
    service: 'gmail',
    auth: {
        user: 'test.michaelmhyu@gmail.com',
        pass: 'Tester123!',
    },
    tls: {
        rejectUnauthorized: false,
    },
    logger: true,
    debug: true,
});

const nodemailer = {
    sendMail: (from, to, subject, text, html) => {
        transporter.sendMail(
            {
                from,
                to,
                subject,
                text,
                html: `<h2>Message from: ${from}</h2><div>${text}</div>`,
            },
            (error, info) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log(info);
                }
            }
        );
    },
};

module.exports = nodemailer;
