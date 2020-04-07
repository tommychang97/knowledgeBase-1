const postModel = require('../models/postModel');

const post = {
    add: (req, res) => {
        const threadid = req.params.threadId;
        const postUserId = req.params.userId;
        const post = {
            threadid,
            id: req.session.Auth.id,
            ...req.body,
        };
        console.log(' ADDING THIS MESSAGE', post);
        postModel.addPost(post).then((response) => {
            console.log('post added', response);
            res.redirect(`home/view/${postUserId}/threads/${threadid}`);
        });
    },
};

module.exports = post;
