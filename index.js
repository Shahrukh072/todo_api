const express = require('express');
const path = require('path');
const app = express();
const port = 8080;

//used for session cookie 
const session = require('express-session');
const passport = require('passport');

const jwt = require('jsonwebtoken');
const db = require('./config/mongoose');
const todo = require('./models/Todo');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));


app.use(session({
    name: 'Todo_api',
    secret: 'something',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    }
}));

app.use(passport.initialize());
app.use(passport.session());


// Routes
app.use('/', require('./routes/index'));


//server
app.listen(port, function () {
    console.log(`Server listening on port ${8080}`);
});
