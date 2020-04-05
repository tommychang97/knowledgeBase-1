'use strict';

const postModel = require('../models/postModel');

const post = {
    create: (req, res) => {
        const form = { ...req.body };
    },
    get: (req, res) => {},
    sendComment: (req, res) => {},
};

module.exports = post;
