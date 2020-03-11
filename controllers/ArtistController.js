"use strict";

const artistModel = require("../models/artistModel");

const controller = {
    addArtist: (req, res) => {
        let newArtist = {
            name: req.body.name,
            about: req.body.about,
            image: req.body.image,
        };
        artistModel
            .addArtist(newArtist)
            .then(() => {
                return res.status(200).redirect("/artists");
            })
            .catch(err => {
                res.send(err);
            });
    },
    deleteArtist: (req, res) => {
        let artistID = req.params.id;
        artistModel
            .deleteArtist(artistID)
            .then(() => {
                return res.status(200).redirect("/artists");
            })
            .catch(err => {
                res.send(err);
            });
    },
    getArtists: (req, res) => {
        let searchValue = req.query.search ? req.query.search : "";

        artistModel
            .getArtists(searchValue)
            .then(artists => {
                return res.status(200).render("artistPage", {
                    title: "Artist Directory",
                    artists,
                });
            })
            .catch(err => {
                res.send(err);
            });
    },
};

module.exports = controller;
