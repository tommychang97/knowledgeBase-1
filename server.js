"use strict";

var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var app = express();
var hbs = require("express-handlebars");

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

const port = 8000;
const mainRoutes = require("./routes/mainRoutes");

let hbsHelpers = hbs.create({
    helpers: require("./helpers/handlesbars").helpers,
    layoutsDir: path.join(__dirname, "views", "layouts"),
    defaultLayout: "main-layout",
    extname: ".hbs",
});

app.engine(".hbs", hbsHelpers.engine);

app.set("view engine", ".hbs");

// HBS
app.get('/', function (req, res){
    res.render("login_signup_page", {login_signup_page:true, login_css: true});
});

app.get('/signup', function (req, res){
    res.render("login_signup_page", {login_signup_page:true, signup_css: true});
});

app.listen(process.env.PORT || port, () => {
    console.log(`Server listening on port: ${port}`);
});

app.use(mainRoutes);
