'use strict';

const convoModel = require('../models/conversationModel');

const conControls = {
    get: (req, res) => {
        res.render('messagesView', { onHome: 'true' });
    },
    create: (req, res) => {
        const form = {
            firstuserid: req.session.Auth.id,
            seconduserid: req.params.userId,
        };
        console.log(form);
        convoModel.createConversation(form).then((result) => {
            console.log('Created convo', result);
        });
    },
};

module.exports = conControls;
