'use strict';

const bcrypt = require('bcrypt');
const passport = require('../util/passport');
const userModel = require('../models/userModel');
const threadModel = require('../models/threadModel');

const momentUtil = require('../util/moment');

const saltRounds = 10;

const authControls = {
    home: (req, res) => {
        console.log(`SessionID: ${req.session.Auth.sessionid}`);
        updateUserDetails(req.session.UserInfo.email).then((userInfo) => {
            userInfo.id = req.session.Auth.id;
            console.log(userInfo);
            threadModel.getThreads(0).then((response) => {
                console.log(response);
                if (response.length) {
                    response.forEach((discussion) => {
                        discussion.date = momentUtil.formatDateMonthYear(
                            discussion.date
                        );
                    });
                }
                res.render('home_page', {
                    onHome: true,
                    user: userInfo,
                    discussions: response,
                });
            });
        });
    },
    login: (req, res) => {
        //todo implement passport
        const { email, password } = req.body;
        userModel
            .getUser(email)
            .then((response) => {
                if (response.length) {
                    const {
                        password: hashedPassword,
                        userid,
                        imageurl,
                        description,
                        country,
                        dob,
                        messages,
                        posts,
                        likes,
                        firstname,
                        lastname,
                    } = response[0];
                    req.session.UserInfo = {
                        name: `${firstname} ${lastname}`,
                        email,
                        image: imageurl,
                        description: description,
                        country: country,
                        birthdate: dob,
                        posts,
                        messages,
                        likes,
                    };
                    bcrypt.compare(password, hashedPassword).then((match) => {
                        if (match) {
                            req.session.Auth = {
                                id: userid,
                                sessionid: req.sessionID,
                            };
                            userModel.createUserSession(req.session.Auth);
                            res.redirect('home');
                        } else {
                            res.redirect('/');
                        }
                    });
                } else {
                    res.redirect('/');
                }
            })
            .catch((err) => {
                console.log(err);
            });
    },
    logout: (req, res) => {
        userModel
            .deleteUserSession(req.session.Auth)
            .then((result) => {
                console.log('Session deleted');
                res.redirect('/');
            })
            .catch((err) => {
                console.log('Failed to log out', err);
            });
    },
    signup: (req, res) => {
        req.session.signup = req.body; // pass signup form to register form
        res.render('login_signup_page', {
            onLoginSignup: true,
            onSignup: true,
        });
    },
    register: (req, res, next) => {
        let form = { ...req.session.signup, ...req.body };
        // hash password
        bcrypt
            .hash(form.password, saltRounds)
            .then((hashedPassword) => {
                form.password = hashedPassword;
                userModel.signUp(form).then((result) => {
                    userModel.getUser(form.email).then((response) => {
                        if (response.length) {
                            const {
                                userid,
                                email,
                                imageurl,
                                description,
                                country,
                                dob,
                                messages,
                                posts,
                                likes,
                                firstname,
                                lastname,
                            } = response[0];
                            req.session.Auth = {
                                id: userid,
                                sessionid: req.sessionID,
                            };
                            req.session.UserInfo = {
                                name: `${firstname} ${lastname}`,
                                email,
                                image: imageurl,
                                description: description,
                                country: country,
                                birthdate: dob,
                                posts,
                                messages,
                                likes,
                            };
                            userModel.createUserSession(req.session.Auth);
                            res.redirect('/home');
                        }
                    });
                });
            })
            .catch((err) => {
                console.log(err);
            });
    },
};
const updateUserDetails = (email) => {
    return new Promise((resolve, reject) => {
        userModel.getUser(email).then((response, err) => {
            if (err) {
                reject(err);
            }
            const {
                imageurl,
                description,
                country,
                dob,
                messages,
                posts,
                likes,
                firstname,
                lastname,
            } = response[0];
            resolve({
                name: `${firstname} ${lastname}`,
                email,
                image: imageurl,
                description: description,
                country: country,
                birthdate: dob,
                posts,
                messages,
                likes,
            });
        });
    });
};

module.exports = authControls;
