'use strict';

const postControls = {
    createPost: (req, res) => {
        const form = { userID: req.session.Auth.userID, ...req.body };
        console.log(form);
        // update db
        // rerender home
        res.redirect('/home');
    },
    get: (req, res) => {
        console.log('get posts');
        if (req.params.postId) {
            const postID = req.params.postId; //ids start at 1
            console.log('Fetching specific post: ', postID);
        }
        res.render('messagesView');
        //db.getMessages
    },
    search: (req, res) => {
        const searchValue = req.query.searchValue;
        console.log('searchValue', searchValue);
        const topic = req.params.topic;
        // query db for posts with name containing value or topic == topic
        // const results = db.findPosts(searchValue, topic);
        const results = { onHome: true };
        res.render('searchView', results);
    },
    sendComment: (req, res) => {},
};

module.exports = postControls;
