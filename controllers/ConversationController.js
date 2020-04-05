'use strict';

const convoModel = require('../models/conversationModel');
const messageModel = require('../models/messageModel');
const userModel = require('../models/userModel');

const momentUtil = require('../util/moment');

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
    getConversations: (req, res, next) => {
        convoModel
            .getConversations({ id: req.session.Auth.id })
            .then((response) => {
                if (response.length) {
                    response.forEach((conversation) => {
                        conversation.conversationdate = momentUtil.formatMonthDate(
                            conversation.conversationdate
                        );
                    });
                }
                if (req.params.conversationId) {
                    // console.log(
                    //     'SPECIFIC CONVERSATION FETCHED',
                    //     req.params.conversationId
                    // );
                    messageModel
                        .getMessages({ id: req.params.conversationId })
                        .then((messages) => {
                            if (messages.length) {
                                messages.forEach((message) => {
                                    console.log(message);
                                    message.conversationDate = momentUtil.formatMonthDate(
                                        message.date
                                    );
                                    message.conversationTimeStamp = momentUtil.formatTimeStamp(
                                        message.date
                                    );
                                });
                            }
                            // console.log(
                            //     `CONVERSATIONS FOR ${req.params.conversationId}`,
                            //     messages
                            // );
                            return res.render('messagesView', {
                                onMessages: 'true',
                                conversations: response,
                                messages: messages,
                                userid: req.params.userId,
                            });
                        });
                } else {
                    // console.log(
                    //     `CONVERSATIONS FOR ${req.session.Auth.id}`,
                    //     response
                    // );
                    res.render('messagesView', {
                        onMessages: 'true',
                        conversations: response,
                        userid: req.params.userId,
                    });
                }
            });
    },
    create: (req, res) => {
        const form = {
            senderid: req.session.Auth.id,
            receiverid: req.params.userId,
            topic: req.body.topic,
            body: req.body.message,
        };

        convoModel.createConversation(form).then((response) => {
            console.log('Created convo', response);
            const message = {
                conversationid: response[0].conversationid,
                ...form,
            };
            messageModel.createMessage(message).then((result, err) => {
                if (err) {
                    console.log('Failed to create message', err);
                }
                res.redirect(`/home/profile/${req.params.userId}`);
            });
        });
    },
    createMessage: (req, res) => {
        const message = {
            conversationid: req.params.conversationId,
            senderid: req.session.Auth.id,
            receiverid: req.params.userId,
            ...req.body,
        };
        console.log('message', message);
        messageModel.createMessage(message).then((response) => {
            console.log('created message', response);
            res.redirect(
                `/home/user/${req.session.Auth.id}/conversations/${req.params.conversationId}`
            );
        });
    },
};

module.exports = conControls;
