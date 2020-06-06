const express = require('express');
const router = express.Router();
const { checkAuthentication } = require('../config/authentication');

// Welcome Page
router.get('/', (req, res) => {
    res.render('welcome');
});

// Dashboard
router.get('/dashboard', checkAuthentication, (req, res) => {
        res.render('dashboard', { name: req.user.name });
});

module.exports = router;