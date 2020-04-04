'use strict';

const msgControls = {
    get: (req, res) => {
        res.render('messagesView', { onHome: 'true' });
    },
    getMessages: (req, res) => {
        // const results = ...
        const results = { onMessages: true };
        res.render('messagesView', { onHome: 'true' });
    },
    sendMessage: (req, res) => {
    },
};

module.exports = msgControls;
