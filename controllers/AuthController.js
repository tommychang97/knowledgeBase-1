const bcrypt = require('bcrypt');
const passport = require('../config/passport');

const userModel = require('../models/userModel');
const threadModel = require('../models/threadModel');
const postModel = require('../models/postModel');
const momentUtil = require('../util/moment');

const saltRounds = 10;

const authControls = {
    authenticate: (req, res, next) => {
        console.log('--------------------------------AUTHENTICATING------------------------------');
        if (req.session.Auth && req.session.Auth.sessionid !== 'undefined') {
            next();
        } else {
            res.redirect('/');
        }
    },
    home: (req, res) => {
        updateUserDetails(req.session.UserInfo.email).then((userInfo) => {
            req.session.UserInfo = userInfo;
            userInfo.id = req.session.Auth.id;
            const page = req.params.page > 0 ? req.params.page : 0;
            console.log('THIS IS THE APGE', page);
            threadModel.getThreads(page).then((response) => {
                if (response.length) {
                    const populatedDiscussions = response.map((discussion) => {
                        discussion.date = momentUtil.formatDateMonthYear(discussion.date);
                        return postModel
                            .getPosts({ id: discussion.threadid, page })
                            .then((posts) => {
                                console.log(`POSTS FOR THREAD ${discussion.threadid}`, posts);
                                discussion.replies = posts;
                                return discussion;
                            });
                    });
                    Promise.all(populatedDiscussions).then((discussions) => {
                        console.log('get threads home', discussions, page);
                        res.render('home_page', {
                            onHome: true,
                            user: userInfo,
                            discussions,
                            page,
                        });
                    });
                } else {
                    res.render('home_page', {
                        onHome: true,
                        user: userInfo,
                        page,
                    });
                }
            });
        });
    },
    login: (req, res) => {
        //todo implement passport
        const { email, password } = req.body;
        passport.authenticate('local', {
            failureRedirect: '/home',
            successRedirect: '/',
        });
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
                            res.redirect('home/main');
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
                            res.redirect('/home/main');
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
                description,
                country,
                birthdate: dob,
                posts,
                messages,
                likes,
            });
        });
    });
};

module.exports = authControls;
