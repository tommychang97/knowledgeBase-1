'use strict';

const mailer = require('../util/mailer');

const msgControls = {
    get: (req, res) => {
        res.render('messagesView', { onMessages: 'true' });
    },
    getMessages: (req, res) => {
        // const results = ...
        const results = { onMessages: true };
        res.render('messagesView', { onMessages: 'true' });
    },
    sendMessage: (req, res) => {},
};

module.exports = msgControls;
