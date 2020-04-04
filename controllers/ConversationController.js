'use strict';

const convoModel = require('../models/conversationModel');

const conControls = {
    getForm: (req, res) => {
        res.render('sendUserMessage', {
            onMessages: true,
            userid: req.params.userId,
        });
    },
    getConversation: (req, res) => {
        console.log(req.params.userId);
        res.render('messagesView', {
            onMessages: 'true',
            userid: req.params.userId,
        });
    },
    create: (req, res) => {
        const userInformation = {
            firstuserid: req.session.Auth.id,
            seconduserid: req.params.userId,
        };
        const form = { ...req.body };

        console.log(form);
        convoModel.createConversation(userInformation).then((result) => {
            res.redirect(`/home/profile/${req.params.userId}`);
            console.log('Created convo', result);
        });
    },
};

module.exports = conControls;
