'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const router = express.Router();

const authController = require('../controllers/AuthController');
const msgController = require('../controllers/MessageController');
const postController = require('../controllers/PostController');
const profileController = require('../controllers/ProfileController');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(express.static(path.join(__dirname, 'public')));

/** Authentication  */
router.get('', (req, res) => {
    res.render('landing');
});

router.get('/home', (req, res) => {
    res.send('homepage');
});

router.post('/login', authController.login);

router.post('/logout', authController.logout);

router.post('/signup', authController.signup);

router.post('/register', authController.register);

/** Profile  */

router.get('/home/user/:userId', profileController.get);

router.post('/home/user/:userId/edit', profileController.edit);

router.post('/home/user/:userId/like', profileController.sendLike);

router.post('/home/user/:userId/message', profileController.sendMessage);

/** Posts == Discussion */

router.get('/home/posts/search', postController.search);

router.get('/home/user/:userId/posts/:postId', postController.get);

router.post(
    '/home/user/:userId/posts/:postId/comment',
    postController.sendComment
);

/** Messages  */

router.get('/home/user/:id/messages/:msgId', msgController.get);

router.post('/home/user/:id/messages/:msgId/send', msgController.sendMessage);

module.exports = router;
