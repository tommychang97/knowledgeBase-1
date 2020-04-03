'use strict';

const msgControls = {
    get: (req, res) => {
        res.render('messagesView');
    },
    getMessages: (req, res) => {
        // const results = ...
        const results = { onMessages: true };
        res.render('messagesView', results);
    },
    sendMessage: (req, res) => {},
};

module.exports = msgControls;
