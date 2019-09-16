const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

// retrieve model class from mongoose with one argument
const User = mongoose.model("users");

passport.serializeUser((user, done) => {
    done(null, user.id); // user model instance ID to identify a user who is stored in the database. OAuth's only purpose is to allow someone to sign in. After that, we use our own internal IDs
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    });
});

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
