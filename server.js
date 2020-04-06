const bodyParser = require('body-parser');
const express = require('express');
const hbs = require('express-handlebars');
const path = require('path');
const session = require('express-session');
const uuid = require('uuid');
const passport = require('./config/passport');
const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const port = 8000;
const mainRoutes = require('./routes/mainRoutes');

const hbsHelpers = hbs.create({
    helpers: require('./helpers/handlesbars').helpers,
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    defaultLayout: 'main-layout',
    extname: '.hbs',
});

app.use(
    session({
        genid: (req) => {
            return uuid.v4(); // use UUIDs for session IDs
        },
        secret: 'tommy changster',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.engine('.hbs', hbsHelpers.engine);

app.set('view engine', '.hbs');

app.listen(process.env.PORT || port, () => {
    console.log(`Server listening on port: ${port}`);
});

app.use(mainRoutes);
