'use strict';

const profileControls = {
    get: (req, res) => {
        // get profileId from req query params
        const profileId = req.params.userId;
        // const userProfile = db.getProfile(profileId);
        const userProfile = {};
        res.render('profileView', userProfile);
    },
    edit: (req, res) => {
        const { name, imageUrl, country, birthdate } = req.body;
        // db.updateUser({name, imageUrl, country, birthdate});
    },
    sendLike: (req, res) => {},
    sendMessage: (req, res) => {},
};

module.exports = profileControls;
