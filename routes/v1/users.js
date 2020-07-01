/* Route file for handling all users */

// Dependencies
const express = require('express');
const router = express.Router({
    mergeParams: true
});

// Bring in the controller methods
const {
    registerUser
} = require('../../contoller/v1/users');

// Routes handling
router.route('/register').post(registerUser);

// Export 
module.exports = router;