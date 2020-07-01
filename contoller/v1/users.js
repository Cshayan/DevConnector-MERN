/* Controller file for handling all methods related to User */

// Dependencies
const gravatar = require('gravatar');

// Load the User Model
const User = require('../../models/User');

// Error Response and Async Handler
const errorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/async');

/*
 *  Endpoint - api/v1/users/register
 *  Method - POST
 *  Desc - Register a new user
 *  Access - Public
 */
exports.registerUser = asyncHandler(async (req, res, next) => {

    // Generate the avatar
    const avatar = gravatar.url(req.body.email, {
        s: '200',
        r: 'pg',
        d: 'mm'
    });
    req.body.avatar = avatar;

    // save the user
    const user = await User.create(req.body);

    sendResponse(user, 201, res);
});

// Function to send response and genearte JWT token
const sendResponse = (user, statusCode, res) => {

    const token = user.generateJWTToken();

    // send response
    res.status(statusCode).json({
        success: true,
        token
    });
};