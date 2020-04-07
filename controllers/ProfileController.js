const userModel = require('../models/userModel');
const threadModel = require('../models/threadModel');
const postModel = require('../models/postModel');
const momentUtil = require('../util/moment');

const profileControls = {
    get: (req, res) => {
        const userId = req.params.userId;
        userModel
            .getUserPage(userId)
            .then((response) => {
                if (response.userThreads.length) {
                    const populatedDiscussions = response.userThreads.map((discussion) => {
                        discussion.date = momentUtil.formatDateMonthYear(discussion.date);
                        return postModel
                            .getPosts({ id: discussion.threadid, page: 0 })
                            .then((posts) => {
                                discussion.replies = posts;
                                return discussion;
                            });
                    });
                    Promise.all(populatedDiscussions).then((discussions) => {
                        const userProfile = {
                            onProfile: true,
                            user: response.userInfo,
                            posts: response.userThreads,
                        };
                        console.log('THIS IS THE USERS PROFILE: ', userProfile);
                        res.render('profileView', userProfile);
                    });
                } else {
                    const userProfile = {
                        onProfile: true,
                        user: response.userInfo,
                    };
                    res.render('profileView', userProfile);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    },
    getEdit: (req, res) => {
        userModel.getUserPage(req.session.Auth.id).then((response) => {
            const userProfile = {
                onHome: true,
                user: {
                    image: response.userInfo.imageurl,
                    id: response.userInfo.userid,
                    ...response.userInfo,
                    name: `${response.userInfo.firstname} ${response.userInfo.lastname}`,
                },
                posts: response.userThreads,
            };
            res.render('editProfileView', userProfile);
        });
    },
    edit: (req, res) => {
        const form = { id: req.session.Auth.id, ...req.body };
        userModel
            .editProfile(form)
            .then((result) => {
                console.log('UPDATE USER INFORMATION', result);
                res.redirect('/home/main');
            })
            .catch((err) => {
                console.log('failed to update user', err);
                res.redirect('/home/main');
            });
        // db.updateUser({name, imageUrl, country, birthdate});
    },
    sendLike: (req, res) => {
        const userId = req.params.userId;
        userModel.incrementLike({ id: req.params.userId }).then((response) => {
            userModel
                .getUserPage(userId)
                .then((response) => {
                    console.log(response);
                    const userProfile = {
                        onProfile: true,
                        user: response.userInfo,
                        posts: response.userThreads,
                    };
                    res.redirect(`/home/profile/${userId}`);
                })
                .catch((err) => {
                    console.log(err);
                });
        });
    },
    sendMessage: (req, res) => {},
};

module.exports = profileControls;
