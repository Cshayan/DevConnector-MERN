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
    getAllProfiles,
    profileByUserID,
    deleteProfilePostsUser,
    createProfileExperience,
    deleteProfileExperience,
    createProfileEducation,
    deleteProfileEducation,
    getGitHubRepo
} = require('../../contoller/v1/profile');

// Protect Route Middleware
const {
    protect
} = require('../../middleware/auth');

// Routes handling
router.route('/me').get(protect, getMyProfile);
router.route('/').post(protect, createOrUpdateProfile).get(getAllProfiles).delete(protect, deleteProfilePostsUser);
router.route('/user/:userid').get(profileByUserID);
router.route('/experience').put(protect, createProfileExperience);
router.route('/experience/:expid').delete(protect, deleteProfileExperience);
router.route('/education').put(protect, createProfileEducation);
router.route('/education/:eduid').delete(protect, deleteProfileEducation);
router.route('/github/:username').get(getGitHubRepo);

// Export 
module.exports = router;