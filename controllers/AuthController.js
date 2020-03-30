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
        bcrypt
            .compare(password, hashedPassword)
            .then(match => {
                if (match) {
                    // passport authenticate
                    // create session
                    res.render('home');
                }
                // if fail, notify user somehow that the authenticate failed
            })
            .catch(err => {
                reject(err);
            });
        // passport authenticate
        // if pass, render home
    },
    logout: (req, res) => {
        // destroy session from db
        // redirect to landing page
        res.render('landing');
    },
    signup: (req, res) => {
        const {
            firstname,
            lastname,
            email,
            password,
            confirm_password,
        } = req.body;
        // front-end should do check for matching password
        // hash password
        bcrypt
            .hash(password, saltRounds)
            .then(hashedPassword => {
                console.log(hashedPassword);
                // register user into db
                // db.signup({firstname, lastname, email, hashedPassword, confirm_password})
                res.render('additionalInfo');
            })
            .catch(err => {
                reject(err);
            });
    },
    register: (req, res) => {
        const { imageUrl, about, country, birthdate } = req.body;
        // db.updateUser({imageUrl, about, country, birthdate});
        res.redirect('home');
    },
};

module.exports = authControls;
