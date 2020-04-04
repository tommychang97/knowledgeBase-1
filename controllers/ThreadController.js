'use strict';

const threadModel = require('../models/threadModel');

const threadControls = {
    createThread: (req, res) => {
        const form = {
            userid: req.session.Auth.id,
            ...req.body,
            date: '2020-04-20',
        };
        console.log(form);
        threadModel.addThread(form).then(result => {
            res.redirect('/home');
        });
    },
    get: (req, res) => {
        console.log('get threads');
        if (req.params.postId) {
            const postID = req.params.postId; //ids start at 1
            console.log('Fetching specific thread: ', postID);
        }
        res.render('messagesView');
        //db.getMessages
    },
    search: (req, res) => {
        const searchValue = req.query.searchValue;
        console.log('searchValue', searchValue);
        const topic = req.params.topic;
        // query db for posts with name containing value or topic == topic
        // const results = db.findPosts(searchValue, topic);
        const results = { onHome: true };
        res.render('searchView', results);
    },
    sendComment: (req, res) => {},
};

module.exports = threadControls;
