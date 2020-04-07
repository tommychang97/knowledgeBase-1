const threadModel = require('../models/threadModel');
const userModel = require('../models/userModel');
const postModel = require('../models/postModel');
const momentUtil = require('../util/moment');
const mailer = require('../util/mailer');

const threadControls = {
    createThread: (req, res) => {
        const form = {
            userid: req.session.Auth.id,
            ...req.body,
        };
        console.log(form);
        threadModel.addThread(form).then((result) => {
            console.log('Added thread', result);
            res.redirect('/home/main');
        });
    },
    get: (req, res) => {
        console.log('thread get', req.session.UserInfo);
        threadModel.getThreadsFromUser({ id: req.params.userId, page: 0 }).then((response) => {
            console.log(response);
            console.log('req.session.UserInfo', req.session.UserInfo);
            if (response.length) {
                req.session.UserInfo.messages = response[0].messages;
                req.session.UserInfo.posts = response[0].posts;
                req.session.UserInfo.likes = response[0].likes;
                const populatedDiscussions = response.map((discussion) => {
                    discussion.date = momentUtil.formatDateMonthYear(discussion.date);
                    return postModel
                        .getPosts({ id: discussion.threadid, page: 0 })
                        .then((posts) => {
                            console.log(`POSTS FOR THREAD ${discussion.threadid}`, posts);
                            discussion.replies = posts;
                            return discussion;
                        });
                });
                Promise.all(populatedDiscussions).then((discussions) => {
                    res.render('allPostsView', {
                        onHome: true,
                        user: { ...req.session.UserInfo, id: req.session.Auth.id },
                        posts: discussions,
                    });
                });
            } else {
                res.render('allPostsView', {
                    onHome: true,
                    user: { ...req.session.UserInfo, id: req.session.Auth.id },
                });
            }
        });
    },
    search: (req, res) => {
        if (req.query.searchValue) {
            threadModel
                .getThreadsByTitle({ title: req.query.searchValue, page: 0 })
                .then((response) => {
                    if (response.length) {
                        const populatedDiscussions = response.map((discussion) => {
                            discussion.date = momentUtil.formatDateMonthYear(discussion.date);
                            return postModel
                                .getPosts({ id: discussion.threadid, page: 0 })
                                .then((posts) => {
                                    console.log(`POSTS FOR THREAD ${discussion.threadid}`, posts);
                                    discussion.replies = posts;
                                    return discussion;
                                });
                        });
                        Promise.all(populatedDiscussions).then((discussions) => {
                            console.log('getThreadsByTitle ONE: ', discussions);
                            const results = { onHome: true, posts: discussions };
                            res.render('searchView', results);
                        });
                    } else {
                        res.render('searchView', { onHome: true });
                    }
                });
        } else if (req.query.subject) {
            threadModel
                .getThreadsBySubject({ subject: req.query.subject, page: 0 })
                .then((response) => {
                    if (response.length) {
                        const populatedDiscussions = response.map((discussion) => {
                            discussion.date = momentUtil.formatDateMonthYear(discussion.date);
                            return postModel
                                .getPosts({ id: discussion.threadid, page: 0 })
                                .then((posts) => {
                                    console.log(`POSTS FOR THREAD ${discussion.threadid}`, posts);
                                    discussion.replies = posts;
                                    return discussion;
                                });
                        });
                        Promise.all(populatedDiscussions).then((discussions) => {
                            console.log('getThreadsBySubject ALL', discussions);
                            const results = { onHome: true, posts: discussions };
                            res.render('searchView', results);
                        });
                    } else {
                        res.render('searchView', { onHome: true });
                    }
                });
        }
    },
    viewOne: (req, res) => {
        const threadid = req.params.threadId;
        console.log('viewone', threadid);
        threadModel.getThreadById(threadid).then((response) => {
            if (response.length) {
                const populatedDiscussions = response.map((discussion) => {
                    discussion.date = momentUtil.formatDateMonthYear(discussion.date);
                    return postModel
                        .getPosts({ id: discussion.threadid, page: 0 })
                        .then((posts) => {
                            discussion.replies = posts;
                            return discussion;
                        });
                });
                Promise.all(populatedDiscussions).then((discussions) => {
                    const results = { onHome: true, posts: discussions };
                    res.render('searchView', results);
                });
            } else {
                res.render('searchView', { onHome: true });
            }
        });
    },
};

module.exports = threadControls;
