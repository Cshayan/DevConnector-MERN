/* Controller file for handling all methods related to profile of the user */

// Load the models
const User = require('../../models/User');
const Profile = require('../../models/Profile');

// Error Response and Async Handler
const ErrorResponse = require('../../utils/ErrorResponse');
const asyncHandler = require('../../middleware/async');

/*
 *  Endpoint - api/v1/profile/me
 *  Method - GET
 *  Desc - Gets the profile of the ccurrent logged in user
 *  Access - Private
 */
exports.getMyProfile = asyncHandler(async (req, res, next) => {

    // find profile by user id
    const profile = await Profile.findOne({
        user: req.user.id
    }).populate('user', ['name', 'avatar']);

    // if profile of the user does not exists
    if (!profile) {
        return next(new ErrorResponse('No profile exists for this user', 400));
    }

    // send the response
    res.status(200).json({
        success: true,
        data: profile
    })
});

/*
 *  Endpoint - api/v1/profile
 *  Method - POST
 *  Desc - Create or Update a User Profile
 *  Access - Private
 */
exports.createOrUpdateProfile = asyncHandler(async (req, res, next) => {

    const {
        company,
        website,
        location,
        status,
        skills,
        bio,
        githubusername,
        github,
        facebook,
        linkedin,
        youtube,
        instagram
    } = req.body;

    /* Create the profile object starts here */

    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (status) profileFields.status = status;
    if (bio) profileFields.bio = bio;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) profileFields.skills = skills.split(',').map(skill => skill.trim());

    // Create the profile fields social object
    profileFields.social = {};
    if (github) profileFields.social.github = github;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (youtube) profileFields.social.youtube = youtube;
    if (instagram) profileFields.social.instagram = instagram;

    /* Create the profile object ends here */

    // Create or update the object here
    let profile = await Profile.findOne({
        user: req.user.id
    });

    // if profile exists, then update it, otherwise create it
    if (profile) {
        profile = await Profile.findOneAndUpdate({
            user: req.user.id
        }, {
            $set: profileFields
        }, {
            new: true
        });

        // send updated response
        return res.status(200).json({
            success: true,
            msg: 'Profile Updated',
            data: profile
        });
    }

    // create the profile here
    profile = await Profile.create(profileFields);

    // send created response
    res.status(201).json({
        success: true,
        msg: 'Profile Created',
        data: profile
    })
});

/*
 *  Endpoint - api/v1/profile
 *  Method - GET
 *  Desc - Gets all profiles
 *  Access - Public
 */
exports.getAllProfiles = asyncHandler(async (req, res, next) => {

    // get all profiles
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);

    // send response
    res.status(200).json({
        success: true,
        count: profiles.length,
        data: profiles
    })
});