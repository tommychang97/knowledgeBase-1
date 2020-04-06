'use strict';

const bcrypt = require('bcrypt');
const passportLocal = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const sessionModel = require('../models/sessionModel');

passportLocal.use(
    new LocalStrategy(function (username, password, done) {
        console.log('dafawfwae');
        User.findOne({ username }, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false);
            }
            if (!user.verifyPassword(password)) {
                return done(null, false);
            }
            return done(null, user);
        });
    })
);

passportLocal.sessionAuthenticate = (sessionid) => {
    console.log(`SessionID: ${sessionid}`);
};

module.exports = passportLocal;
