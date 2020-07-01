/* Route file for handling all users authentication */

// Dependencies
const express = require('express');
const router = express.Router({
    mergeParams: true
});

// Bring in the controller methods
const {
    getMe,
    loginUser
} = require('../../contoller/v1/auth');

// Protect Route Middleware
const {
    protect
} = require('../../middleware/auth');

// Route Handling
router.route('/login').post(loginUser);
router.route('/').get(protect, getMe);

// Export router
module.exports = router;