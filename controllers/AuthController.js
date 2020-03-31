'use strict';

const bcrypt = require('bcrypt');
const passport = require('../util/passport');

const saltRounds = 10;

const authControls = {
    login: (req, res) => {
        const { username, password } = req.body;
        // fetch hashed password from db using username as query
        // const hashedPassword = db.queryPassword;
        let hashedPassword;
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
                //  db.signup(form);
            })
            .catch(err => {
                reject(err);
            });
        res.redirect('home');
    },
};

module.exports = authControls;
