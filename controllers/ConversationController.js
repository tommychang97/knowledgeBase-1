'use strict';

const convoModel = require('../models/conversationModel');
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
        const userInformation = {
            firstuserid: req.session.Auth.id,
            // name: `${req.session.UserInfo.firstname} ${req.session.UserInfo.lastname}`,
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
