'use strict';

const profileControls = {
    get: (req, res) => {
        // get profileId from req query params
        const profileId = req.params.userId;
        // const userProfile = db.getProfile(profileId);
        const userProfile = { onProfile: true };
        res.render('profileView', userProfile);
    },
    getPosts: (req, res) => {
        const userId = req.params.userId;
        //db.getMessages

        const results = { onHome: true};
        res.render('allPostsView', results)
    },
    editProfile: (req, res) => {
        const results = { onHome: true};
        res.render('editProfileView', results)
    },
    edit: (req, res) => {
        const { name, imageUrl, country, birthdate } = req.body;
        // db.updateUser({name, imageUrl, country, birthdate});
    },
    sendLike: (req, res) => {},
    sendMessage: (req, res) => {},
};

module.exports = profileControls;
