/* Route file for handling profile of users */

// Dependencies
const express = require('express');
const router = express.Router({
    mergeParams: true
});

// Bring in the controller methods
const {
    getMyProfile,
    createOrUpdateProfile,
    getAllProfiles
} = require('../../contoller/v1/profile');

// Protect Route Middleware
const {
    protect
} = require('../../middleware/auth');

// Routes handling
router.route('/me').get(protect, getMyProfile);
router.route('/').post(protect, createOrUpdateProfile).get(getAllProfiles);

// Export 
module.exports = router;