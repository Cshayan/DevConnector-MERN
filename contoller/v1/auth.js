/* Controller file for handling all methods related to User authentication */

// Load the User Model
const User = require('../../models/User');

// Error Response and Async Handler
const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/async');

/*
 *  Endpoint - api/v1/users/auth/me
 *  Method - GET
 *  Desc - Gives the info of the currently logged in user
 *  Access - Private
 */
exports.getMe = asyncHandler(async (req, res, next) => {

    // find the user from DB
    const user = await User.findById(req.user.id);

    // send back the response
    res.status(200).json({
        success: true,
        data: user
    });
});

/*
 *  Endpoint - POST api/v1/users/auth/login
 *  Purpose - Logins an existing user
 *  Access - Public
 */
exports.loginUser = asyncHandler(async (req, res, next) => {

    // get email and password
    const {
        email,
        password
    } = req.body;

    // if no email or password provided
    if (!email || !password) {
        return next(new ErrorResponse('Please provide an email and password', 400));
    }

    // search the user by email
    const user = await User.findOne({
        email
    }).select('+password');

    // if no user
    if (!user) {
        return next(new ErrorResponse(`No user is present with email ${email}`, 404));
    }

    const isMatch = await user.matchPassword(password);

    // if password don't match 
    if (!isMatch) {
        return next(new ErrorResponse('Invalid credentials provided', 404));
    }

    sendResponse(user, 200, res);
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