const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');

// User Model
const User = require('../models/User');

// Login Page
router.get('/login', (req, res) => {
    res.render('login');
})

// Register Page
router.get('/register', (req, res) => {
    res.render('register');
})

// Logout Handler
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/users/login');
})

// Register Handler
router.post('/register', (req, res) => {
    const { name, email, password, password2 } = req.body;
    let errors = [];

    // Check required fields
    if (!name || !email || !password || !password2) {
        errors.push({ msg: 'Please fill in all fields' });
    }

    // Check password match
    if (password != password2) {
        errors.push({ msg: 'Passwords do not match' })
    }

    // Check pass length
    if (password.length < 8) {
        errors.push({ msg: 'Password should be at least 8 characters' })
    }

    if (errors.length > 0) {
        res.render('register', {
            errors: errors,
            name: name,
            email: email,
            password: password,
            password2: password2
        })
    } else {
        // Validation passed
        User.findOne({ email: email }, (err, doc) => {

            if (doc) {
                errors.push({ msg: 'User already registered. Please log in or try a different email' })
                res.render('register', {
                    errors,
                    name,
                    email,
                    password,
                    password2
                })
            } else {
                bcrypt.hash(password, 15, (err, hash) => {
                    let user = new User({
                        name,
                        email,
                        password: hash
                    });
                    user.save();
                })
                req.flash('success_msg', 'Registration Successful. You can now log in');
                res.redirect('/users/login');
            }

        })
    }
})

// Login Handler
router.post('/login', (req, res, next) => {
    passport.authenticate('local',  {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
    console.log(res.locals);
  });

module.exports = router;