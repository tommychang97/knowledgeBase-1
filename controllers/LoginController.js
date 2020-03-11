const fsPromises = require("fs").promises;
const path = require("path");

const controller = {
    init: (req, res) => {
        res.render("login", { title: "Login Directory" });
    },
    login: (req, res) => {
        if (req.body.username === "A01041867" && req.body.pwd === "password") {
            res.redirect("/artists");
        } else {
            res.redirect("/");
        }
    },
};

module.exports = controller;
