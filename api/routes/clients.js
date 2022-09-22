const express = require('express');
const router = express.Router(); // intializing the current route with an express middleware
const mongoose = require('mongoose');

const Client = require('../models/client');

/* Sign up route */
router.post('/signup', (req, res) => {
    const client = new Client({
        _id: new mongoose.Types.ObjectId(),
        email: req.body.email,
        password: req.body.password
    });
});

module.exports = router;