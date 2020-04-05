'use strict';

const postModel = require('../models/postModel');

const post = {
    add: (req, res) => {
        const threadid = req.params.threadId;
        console.log('parse input from form...', { ...req.body });
        const post = {
            threadid,
            id: req.session.Auth.id,
            body: 'TEST STRING FROM SERVER',
        };
        console.log(post);
    },
    get: (req, res) => {},
    sendComment: (req, res) => {},
};

module.exports = post;
