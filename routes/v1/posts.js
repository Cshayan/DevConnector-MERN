/* Route file for handling profile of users */

// Dependencies
const express = require('express');
const router = express.Router({
    mergeParams: true
});

// Bring in the controller methods
const {
    createPosts,
    getAllPosts,
    getPostByID,
    deletePost,
    addLikeToPost,
    unlikePosts
} = require('../../contoller/v1/post');

// Bring in protect middleware
const {
    protect
} = require('../../middleware/auth');

// Route Settings
router.route('/').post(protect, createPosts).get(protect, getAllPosts);
router.route('/:postid').get(protect, getPostByID).delete(protect, deletePost);
router.route('/like/:postid').put(protect, addLikeToPost);
router.route('/unlike/:postid').put(protect, unlikePosts);

// Export router
module.exports = router;