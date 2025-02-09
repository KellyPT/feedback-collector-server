// commonJS modules vs ES2015 modules on client side import express from 'express';
const express = require("express");
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require("./models/Users");
require("./services/passport");

mongoose.connect(keys.mongoURI);

// single Express app here. we will use this to set up config
const app = express();

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);

const PORT = process.env.PORT || 5000; // if there is no environment variable that already defined by Heroku, assign that variable to PORT. otherwise, use the default value of 5000.

app.listen(PORT);
