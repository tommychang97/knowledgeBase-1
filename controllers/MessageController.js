const mailer = require('../util/mailer');
const userModel = require('../models/userModel');

const msgControls = {
    get: (req, res) => {
        const userIdToMessage = req.params.userId;
        userModel.getUserPage(userIdToMessage).then((response) => {
            const userDetails = { ...response.userInfo };
            console.log(userDetails.imageurl);
            res.render('messagesView', {
                onMessages: 'true',
                user: { imageurl: userDetails.imageurl },
            });
        });
    },
    getMessages: (req, res) => {
        // const results = ...
        const results = { onMessages: true };
        res.render('messagesView', { onMessages: 'true' });
    },
    sendMessage: (req, res) => {},
};

module.exports = msgControls;
