const express = require('express');
const router = express.Router(); // intializing the current route with an express middleware
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // generating web tokens

const Client = require('../models/client');

/* Controller */
const ClientController = require('../controllers/clients')

/* Sign up route */
router.post('/signup', ClientController.client_sign_up);

// log-in
router.post('/login', ClientController.client_login);

// delete 
router.delete('/:clientId', ClientController.delete_client);

module.exports = router;