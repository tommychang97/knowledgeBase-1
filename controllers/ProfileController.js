'use strict';

const userModel = require('../models/userModel');
const momentUtil = require('../util/moment');

const profileControls = {
    get: (req, res) => {
        const userId = req.params.userId;
        console.log('userID', userId);
        userModel
            .getUserPage(userId)
            .then((response) => {
                if (response.userThreads.length) {
                    response.userThreads.forEach((discussion) => {
                        discussion.date = momentUtil.formatDateMonthYear(
                            discussion.date
                        );
                    });
                }
                const userProfile = {
                    onProfile: true,
                    user: response.userInfo,
                    posts: response.userThreads,
                };
                console.log(userProfile);
                res.render('profileView', userProfile);
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
                },
                posts: response.userThreads,
            };
            console.log(userProfile);
            res.render('editProfileView', userProfile);
        });
    },
    edit: (req, res) => {
        const form = { id: req.session.Auth.id, ...req.body };
        console.table(form);
        userModel
            .editProfile(form)
            .then((result) => {
                res.redirect('/home');
            })
            .catch((err) => {
                console.log('failed to update user', err);
                res.redirect('/home');
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
