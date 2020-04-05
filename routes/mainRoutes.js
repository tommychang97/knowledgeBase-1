'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const router = express.Router();

const authController = require('../controllers/AuthController');
const msgController = require('../controllers/MessageController');
const threadController = require('../controllers/ThreadController');
const profileController = require('../controllers/ProfileController');
const convoController = require('../controllers/ConversationController');
const postController = require('../controllers/PostController');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(express.static(path.join(__dirname, 'public')));

router.get('/', (req, res) => {
    res.render('login_signup_page', { onLoginSignup: true, onLogin: true });
});

/** Authentication  */
router.post('/signup', authController.signup);

router.get('/home', authController.home);

router.post('/login', authController.login);

router.post('/logout', authController.logout);

router.post('/signup', authController.signup);

router.post('/register', authController.register);

/** Profile  */
router.get('/home/profile/:userId', profileController.get);

router.post('/home/user/:userId/edit', profileController.edit);

router.post('/home/user/:userId/like', profileController.sendLike);

router.post('/home/user/:userId/message', profileController.sendMessage);

/** Thread */
router.post('/createThread', threadController.createThread);

router.get('/home/search', threadController.search);

router.get('/home/user/:userId/threads/:threadId?/:search?', threadController.get);

// router.post(
//     '/home/user/:userId/threads/:postId/comment',
//     threadController.sendComment
// );

/** Posts */
router.post('/post', postController.create);

router.get('/home/posts/:postId?/:search?', postController.get);

router.post(
    '/home/user/:userId/posts/:postId/comment',
    postController.sendComment
);







/** Messages  */

router.get('/home/user/:userId/messages/:msgId?', msgController.get);

router.post('/home/user/:userId/messages/send', msgController.sendMessage);


/** Conversations  */

router.get('/home/user/:userId/conversations/create', convoController.getForm);

router.get('/home/user/:userId/conversations/:conversationId?', convoController.getConversations);

router.post('/home/user/:userId/conversations/create', convoController.create);

module.exports = router;
