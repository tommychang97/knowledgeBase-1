'use strict';

var bodyParser = require('body-parser');
var express = require('express');
var hbs = require('express-handlebars');
var path = require('path');
var session = require('express-session');
var uuid = require('uuid');
var app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const port = 8000;
const mainRoutes = require('./routes/mainRoutes');

let hbsHelpers = hbs.create({
    helpers: require('./helpers/handlesbars').helpers,
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    defaultLayout: 'main-layout',
    extname: '.hbs',
});

app.use(
    session({
        genid: req => {
            return uuid.v4(); // use UUIDs for session IDs
        },
        secret: 'tommy changster',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },
    })
);

app.engine('.hbs', hbsHelpers.engine);

app.set('view engine', '.hbs');

app.listen(process.env.PORT || port, () => {
    console.log(`Server listening on port: ${port}`);
});

app.use(mainRoutes);
