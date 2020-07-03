/* Controller file for handling all methods related to posts of the user */

// Load the models
const User = require("../../models/User");
const Post = require('../../models/Post');
const Profile = require("../../models/Profile");

// Error Response and Async Handler
const ErrorResponse = require("../../utils/ErrorResponse");
const asyncHandler = require("../../middleware/async");
const router = require("../../routes/v1/posts");

/*
 *  Endpoint - api/v1/post
 *  Method - POST
 *  Desc - Creates a new post
 *  Access - Private
 */
exports.createPosts = asyncHandler(async (req, res, next) => {

    // find the user for whom post is to be created
    const user = await User.findById(req.user.id);

    // creating post body
    req.body.user = req.user.id;
    req.body.name = user.name;
    req.body.avatar = user.avatar;

    // create the post
    const post = await Post.create(req.body);

    // send response
    res.status(201).json({
        success: true,
        data: post
    });
});

/*
 *  Endpoint - api/v1/post
 *  Method - GET
 *  Desc - Gets all posts
 *  Access - Private
 */
exports.getAllPosts = asyncHandler(async (req, res, next) => {

    // find all posts sorted by date in descending order
    const posts = await Post.find().sort({
        date: -1
    });

    // response
    res.status(200).json({
        success: true,
        count: posts.length,
        data: posts
    })
});

/*
 *  Endpoint - api/v1/post/postid
 *  Method - GET
 *  Desc - Gets post by id
 *  Access - Private
 */
exports.getPostByID = asyncHandler(async (req, res, next) => {

    // find post by id
    const post = await Post.findById(req.params.postid);

    if (!post) {
        return next(new ErrorResponse('No post found', 400));
    }

    // send response
    res.status(200).json({
        success: true,
        data: post
    });
});

/*
 *  Endpoint - api/v1/post/:postid
 *  Method - DELETE
 *  Desc - Delete a post by id
 *  Access - Private
 */
exports.deletePost = asyncHandler(async (req, res, next) => {

    // find the post to be deleted
    const post = await Post.findById(req.params.postid);

    if (!post) {
        return next(new ErrorResponse('No post found', 400));
    }

    // Check if the logged in user is deleting the post
    if (post.user.toString() !== req.user.id) {
        return next(new ErrorResponse('User not authorised to delete the post', 401));
    }

    // remove the post
    await post.remove();

    // response
    res.status(200).json({
        success: true,
        msg: 'Post deleted successfully'
    });
});

/*
 *  Endpoint - api/v1/post/like/:postid
 *  Method - PUT
 *  Desc - Add like to posts
 *  Access - Private
 */
exports.addLikeToPost = asyncHandler(async (req, res, next) => {

    // find the post to be liked
    const post = await Post.findById(req.params.postid);

    // check if the post has already been liked by the user
    if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
        return next(new ErrorResponse('Post already liked', 400));
    }

    // add the like
    post.likes.unshift({
        user: req.user.id
    });

    // save to database
    await post.save();

    // response
    res.status(200).json({
        success: true,
        data: post.likes
    });
});

/*
 *  Endpoint - api/v1/post/unlike/:postid
 *  Method - PUT
 *  Desc - Remove like from posts
 *  Access - Private
 */
exports.unlikePosts = asyncHandler(async (req, res, next) => {

    // find the post
    const post = await Post.findById(req.params.postid);

    // check if the post is liked already to be disliked
    if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
        return next(new ErrorResponse('Post needs to liked to dislike', 400));
    }

    // Get likeRemoveIndex
    const removeIndexLike = post.likes.map(like => like.user.toString()).indexOf(req.user.id);

    // remove the like
    post.likes.splice(removeIndexLike, 1);

    // save to DB
    await post.save();

    // response
    res.status(200).json({
        success: true,
        msg: 'Post unliked',
        data: post.likes
    })
});