'use strict';

const convoModel = require('../models/conversationModel');
const messageModel = require('../models/messageModel');
const userModel = require('../models/userModel');

const conControls = {
    getForm: (req, res) => {
        const userIdToMessage = req.params.userId;
        userModel.getUserPage(userIdToMessage).then((response) => {
            const userDetails = { ...response.userInfo };
            res.render('sendUserMessage', {
                onMessages: true,
                user: {
                    id: req.params.userId,
                    imageurl: userDetails.imageurl,
                },
            });
        });
    },
    getConversations: (req, res) => {
        if (req.params.conversationId) {
            console.log(
                'SPECIFIC CONVERSATION FETCHED',
                req.params.conversationId
            );
        }
        convoModel
            .getConversations({ id: req.session.Auth.id })
            .then((response) => {
                console.log(
                    `CONVERSATIONS FOR ${req.session.Auth.id}`,
                    response
                );
                res.render('messagesView', {
                    onMessages: 'true',
                    conversations: response,
                    userid: req.params.userId,
                });
            });
    },
    create: (req, res) => {
        const form = {
            senderid: req.session.Auth.id,
            receiverid: req.params.userId,
            topic: req.body.topic,
        };

        console.log(form);
        convoModel.createConversation(form).then((response) => {
            console.log('Created convo', response);
            const message = {
                conversationid: response[0].conversationid,
                ...req.body,
            };
            messageModel.createMessage(message).then((result) => {
                if (err) {
                    console.log("Failed to create message", err);
                }
                res.redirect(`/home/profile/${req.params.userId}`);
            });
        });
    },
};

module.exports = conControls;
