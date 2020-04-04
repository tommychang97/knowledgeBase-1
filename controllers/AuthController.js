'use strict';

const bcrypt = require('bcrypt');
const passport = require('../util/passport');
const userModel = require('../models/userModel');

const saltRounds = 10;

const authControls = {
    home: (req, res) => {
        console.log(`SessionID: ${req.session.Auth.sessionID}`);
        res.render('home_page', { onHome: true, user: req.session.UserInfo });
    },
    login: (req, res) => {
        //todo implement passport
        const { email, password } = req.body;
        userModel
            .getUser(email)
            .then(response => {
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
                    bcrypt.compare(password, hashedPassword).then(match => {
                        if (match) {
                            req.session.Auth = {
                                id: userid,
                                sessionID: req.sessionID,
                            };
                            req.session.UserInfo = {
                                name: `${firstname} ${lastname}`,
                                image: imageurl,
                                description: description,
                                country: country,
                                birthdate: dob,
                                posts,
                                messages,
                                likes,
                            };
                            res.redirect('home');
                        } else {
                            res.redirect('');
                        }
                    });
                } else {
                    res.redirect('/');
                }
            })
            .catch(err => {
                console.log(err);
            });
    },
    logout: (req, res) => {
        userModel;
        // .deleteUserSession(req.session.Auth)
        // .then(() => {
        res.redirect('/');
        // })
        // .catch(err => {
        //     console.log('Failed to log out', err);
        // });
    },
    signup: (req, res) => {
        req.session.signup = req.body; // pass signup form to register form
        res.render('login_signup_page', {
            onLoginSignup: true,
            onSignup: true,
        });
    },
    register: (req, res) => {
        let form = { ...req.session.signup, ...req.body };
        // hash password
        bcrypt
            .hash(form.password, saltRounds)
            .then(hashedPassword => {
                form.password = hashedPassword;
                console.log(form);
                // register user into db
                userModel.signUp(form);
            })
            .catch(err => {
                console.log(err);
            });
        res.redirect('home');
    },
};

module.exports = authControls;
