'use strict';

const threadModel = require('../models/threadModel');
const userModel = require('../models/userModel');

const threadControls = {
    createThread: (req, res) => {
        const form = {
            userid: req.session.Auth.id,
            ...req.body,
        };
        console.log(form);
        threadModel.addThread(form).then((result) => {
            console.log('Added thread', result);
            res.redirect('/home');
        });
    },
    get: (req, res) => {
        threadModel
            .getThreadsFromUser({ id: req.params.userId, page: 0 })
            .then((response) => {
                console.log(response);
                res.render('messagesView', response);
            });
    },
    search: (req, res) => {
        if (req.query.searchValue) {
            threadModel
                .getThreadsByTitle({ title: req.query.searchValue, page: 0 })
                .then((response) => {
                    const results = { onHome: true, response };
                    res.render('searchView', results);
                });
        } else if (req.query.subject) {
            threadModel
                .getThreadsBySubject({ subject: req.query.subject, page: 0 })
                .then((response) => {
                    const results = { onHome: true, response };
                    res.render('searchView', results);
                });
        }
    },
    sendComment: (req, res) => {},
};

module.exports = threadControls;
