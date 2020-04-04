'use strict';

const bcrypt = require('bcrypt');
const passport = require('../util/passport');
const db = require('../util/postgres');
const userModel = require('../models/userModel');

const saltRounds = 10;

const authControls = {
    login: (req, res) => {
        const {email, password} = req.body;
        const userResults = userModel.getUser(email);
        userResults.then((data) => {
            if (data === undefined || data.length == 0) {
                console.log("No such person found!");
                // if fail, notify user somehow that the combination of email/pw is invalid 
            }
            else {
                console.log(data);
                const hashedPassword = "123";
                // fetch hashed password from db using username as query
                // const hashedPassword = db.queryPassword;
                // bcrypt
                //     .compare(password, hashedPassword)
                //     .then(match => {
                //         if (match) {
                            // passport authenticate
                            // create session          
                            res.redirect('home');
                        // }
                        // if fail, notify user somehow that the authenticate failed
                    // })
                    // .catch(err => {
                    //     console.log(err);
                    // });
                // passport authenticate
                // if pass, render home
            }
        }).catch(function(error) {
            console.log(error);
        }) 
    },
    logout: (req, res) => {
        // destroy session from db
        // redirect to landing page
        res.render('/');
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
                userModel.signUp(form)
            })
            .catch(err => {
                console.log(err);
            });
        res.redirect('home');
    },
};

module.exports = authControls;
