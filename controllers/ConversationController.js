const convoModel = require('../models/conversationModel');
const messageModel = require('../models/messageModel');
const userModel = require('../models/userModel');

const momentUtil = require('../util/moment');
const mailer = require('../util/mailer');

const conControls = {
    getForm: (req, res) => {
        const userIdToMessage = req.params.userId;
        userModel.getUserPage(userIdToMessage).then((response) => {
            const userDetails = { ...response.userInfo };
            res.render('sendUserMessage', {
                onProfile: true,
                user: {
                    id: req.params.userId,
                    imageurl: userDetails.imageurl,
                },
            });
        });
    },
    getConversations: (req, res, next) => {
        convoModel.getConversations({ id: req.session.Auth.id }).then((response) => {
            // console.log(`getConversations`, response);
            if (response.length) {
                response.forEach((conversation) => {
                    conversation.receiverid =
                    conversation.receiverid === req.session.Auth.id
                            ? conversation.senderid
                            : conversation.receiverid;
                    conversation.conversationdate = momentUtil.formatMonthDate(
                        conversation.conversationdate
                    );
                });
            }
            if (req.params.conversationId) {
                // console.log('SPECIFIC CONVERSATION FETCHED', req.params.conversationId);
                messageModel.getMessages({ id: req.params.conversationId }).then((messages) => {
                    if (messages.length) {
                        messages.forEach((message) => {
                            message.conversationDate = momentUtil.formatMonthDate(message.date);
                            message.conversationTimeStamp = momentUtil.formatTimeStamp(
                                message.date
                            );
                        });
                    }
                    // console.log(`messages FOR ${req.params.conversationId}`, messages);
                    return res.render('messagesView', {
                        onMessages: 'true',
                        conversations: response,
                        messages: messages,
                        userid: req.params.userId,
                    });
                });
            } else {
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
                const userIdToSendTo =
                    message.senderid === req.session.Auth.id
                        ? message.receiverid
                        : message.senderid;
                console.log(
                    `WHAT ARE THE IDS? MINE: ${req.session.Auth.id} SENDING TO: ${userIdToSendTo}`
                );
                userModel.getUserPage(userIdToSendTo).then((user) => {
                    console.log('USERINFO', user.userInfo.email);
                    const from = req.session.UserInfo.email;
                    const to = user.userInfo.email;
                    const subject = `[KNOWLEDGEBASE] Message Notification from ${req.session.UserInfo.firstname} ${req.session.UserInfo.lastname}`;
                    const text = message.body;
                    mailer.sendMail(from, to, subject, text);
                });
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
        messageModel.createMessage(message).then((response) => {
            const userIdToSendTo =
                message.senderid === req.session.Auth.id ? message.receiverid : message.senderid;
            console.log(
                `WHAT ARE THE IDS? MINE: ${req.session.Auth.id} SENDING TO: ${userIdToSendTo}`
            );
            userModel.getUserPage(userIdToSendTo).then((user) => {
                console.log('USERINFO', user.userInfo.email);
                const from = req.session.UserInfo.email;
                const to = user.userInfo.email;
                const subject = `[KNOWLEDGEBASE] Message Notification from ${req.session.UserInfo.name}`;
                const text = message.body;
                mailer.sendMail(from, to, subject, text);
            });
            res.redirect(
                `/home/user/${req.session.Auth.id}/conversations/${req.params.conversationId}`
            );
        });
    },
};

module.exports = conControls;
