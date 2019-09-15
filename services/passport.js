const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

// retrieve model class from mongoose with one argument
const User = mongoose.model("users");

passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: "/auth/google/callback"
        },
        (accessToken, refreshToken, profile, done) => {
            User.findOne({ googleId: profile.id }).then(existingUser => {
                if (existingUser) {
                    // we already have a record with the given profile ID
                    // the first argument is the error, the second argument is the record
                    done(null, existingUser);
                } else {
                    // we don't have a user record with this ID, make a new record in the collection by creating a new mongoose model instance
                    // the save operation is an async function
                    new User({ googleId: profile.id })
                        .save()
                        .then(user => done(null, user));
                }
            });
        }
    )
);
