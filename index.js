require('dotenv').config();
const express = require('express');
const port = process.env.port || 7000;
const app = express();
const URL = require('./config/mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const mongoStore = require('connect-mongo');
const passportLocal = require('./config/passport-local');
const passportGoogle = require('./config/google-oauth');
const customMWare = require('./config/flash_middleware');
const expressLayouts = require('express-ejs-layouts');

//setup url encoded with body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
// app.use(express.urlencoded())
app.use(cookieParser());
//setup express ejs layouts
app.use('/', expressLayouts);
//accessing assets files from front-end
app.use(express.static('assets'));
//setup view-engibe--> ejs
app.set('view engine', 'ejs');
app.set('views', './view');
// session creation
//creating authentication by passport
//mongo store used to store the session cookie in the db
app.use(session({
    name: 'system-oauth',
    // TODO change the secret before deployment in production mode
    secret: process.env.secret_key,
    saveUninitialized: false,
    resave: false,
    rolling: true,
    cookie: {
        maxAge: (1000 * 60 * 100),
        touchAfter: 5000
    },
    store: mongoStore.create({
        mongoUrl: process.env.URL,
        autoRemove: 'disabled',
        stringify: false,
    },
        function (err) {
            console.log(err || 'Connected to mongodb successfully !!');
        }
    )
}));
app.use(passport.initialize());
app.use(passport.session());
//set authentication from passport
app.use(passport.setAuthenticatedUser);
//for flash messages
app.use(flash());
app.use(customMWare.setFlash)
app.use('/', require('./routes'));
app.listen(port, function (err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log('server is up and running on port', port);
});