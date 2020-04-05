'use strict';

const threadModel = require('../models/threadModel');
const userModel = require('../models/userModel');

const momentUtil = require('../util/moment');

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
        console.log('thread get', req.session.UserInfo);
        threadModel
            .getThreadsFromUser({ id: req.params.userId, page: 0 })
            .then((response) => {
                console.log(response);
                console.log('req.session.UserInfo', req.session.UserInfo);
                if (response.length) {
                    response.forEach((discussion) => {
                        discussion.date = momentUtil.formatDateMonthYear(
                            discussion.date
                        );
                    });
                    req.session.UserInfo.messages = response[0].messages;
                    req.session.UserInfo.posts = response[0].posts;
                    req.session.UserInfo.likes = response[0].likes;
                }
                res.render('allPostsView', {
                    onHome: true,
                    user: { ...req.session.UserInfo, id: req.session.Auth.id },
                    posts: response,
                });
            });
    },
    search: (req, res) => {
        if (req.query.searchValue) {
            threadModel
                .getThreadsByTitle({ title: req.query.searchValue, page: 0 })
                .then((response) => {
                    if (response.length) {
                        response.forEach((discussion) => {
                            discussion.date = momentUtil.formatDateMonthYear(
                                discussion.date
                            );
                        });
                    }
                    console.log('getThreadsByTitle ONE: ', response);
                    const results = { onHome: true, posts: response };
                    res.render('searchView', results);
                });
        } else if (req.query.subject) {
            threadModel
                .getThreadsBySubject({ subject: req.query.subject, page: 0 })
                .then((response) => {
                    if (response.length) {
                        response.forEach((discussion) => {
                            discussion.date = momentUtil.formatDateMonthYear(
                                discussion.date
                            );
                        });
                    }
                    console.log('getThreadsBySubject ALL', response);
                    const results = { onHome: true, posts: response };
                    res.render('searchView', results);
                });
        }
    },
};

module.exports = threadControls;
