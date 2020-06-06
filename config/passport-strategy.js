const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Load User Model

const User = require('../models/User');

module.exports = function (passport) {
    passport.use(new LocalStrategy({
        usernameField: 'email'
    },
        (username, password, done) => {
            User.findOne({ email: username }, (err, user) => {

                if (err) { return done(err); }

                if (!user) {
                    return done(null, false, { message: 'That email is not registered.' });
                }

                bcrypt.compare(password, user.password, (err, match) => {
                    if (err) throw err;

                    if (!match) {
                        return done(null, false, { message: 'Incorrect password.' });
                    }

                    if (match) {
                        console.log(user);
                        return done(null, user);
                    }

                })
            })
        }
    ));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
}