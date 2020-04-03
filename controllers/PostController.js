'use strict';

const postControls = {
    get: (req, res) => {
        const msgId = req.params.msgId; //ids start at 1
        const userId = req.params.userId;
        if (msgId) {
            // db.getMessage(msgId)
        }
        //db.getMessages
    },
    search: (req, res) => {
        const searchValue = req.params.searchValue;
        const topic = req.params.topic;
        // query db for posts with name containing value or topic == topic
        // const results = db.findPosts(searchValue, topic);
        const results = { onHome: true };
        res.render('searchView', results);
    },
    sendComment: (req, res) => {},
};

module.exports = postControls;
