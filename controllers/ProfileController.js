'use strict';

const userModel = require('../models/userModel');

const profileControls = {
    get: (req, res) => {
        const userId = req.params.userId;
        console.log('userID', userId);
        userModel
            .getUserPage(userId)
            .then((response) => {
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
    edit: (req, res) => {
        const {
            firstname,
            lastname,
            description,
            imageurl = { imageUrl },
            country,
            birthdate,
        } = req.body;
        const form = {
            firstname,
            lastname,
            description,
            imageurl,
            country,
            birthdate,
        };
        userModel.editProfile(form).then((result) => {
            res.redirect('home');
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
