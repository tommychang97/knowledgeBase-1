'use strict';

const bcrypt = require('bcrypt');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;

const passportLocal = {
    encryptPassword: password => {
        bcrypt.hash(password, saltRounds).then(hash => {
            return hash;
        }).catch(err => {
            reject(err);
        });
    },
    comparePassword: (plaintextPassword, hashedPassword) => {
        bcrypt.compare(plaintextPassword, hashedPassword, (err, evalResult) => {
            if (err) {
                reject(err);
            }
            return evalResult;
        });
    },
};

module.exports = passportLocal;
