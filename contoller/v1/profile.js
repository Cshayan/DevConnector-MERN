/* Controller file for handling all methods related to profile of the user */

// Dependencies
const request = require('request');

// Load the models
const User = require("../../models/User");
const Profile = require("../../models/Profile");

// Error Response and Async Handler
const ErrorResponse = require("../../utils/ErrorResponse");
const asyncHandler = require("../../middleware/async");

/*
 *  Endpoint - api/v1/profile/me
 *  Method - GET
 *  Desc - Gets the profile of the current logged in user
 *  Access - Private
 */
exports.getMyProfile = asyncHandler(async (req, res, next) => {
    // find profile by user id
    const profile = await Profile.findOne({
        user: req.user.id,
    }).populate("user", ["name", "avatar"]);

    // if profile of the user does not exists
    if (!profile) {
        return next(new ErrorResponse("No profile exists for this user", 400));
    }

    // send the response
    res.status(200).json({
        success: true,
        data: profile,
    });
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
        instagram,
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
    if (skills)
        profileFields.skills = skills.split(",").map((skill) => skill.trim());

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
        user: req.user.id,
    });

    // if profile exists, then update it, otherwise create it
    if (profile) {
        profile = await Profile.findOneAndUpdate({
            user: req.user.id,
        }, {
            $set: profileFields,
        }, {
            new: true,
        });

        // send updated response
        return res.status(200).json({
            success: true,
            msg: "Profile Updated",
            data: profile,
        });
    }

    // create the profile here
    profile = await Profile.create(profileFields);

    // send created response
    res.status(201).json({
        success: true,
        msg: "Profile Created",
        data: profile,
    });
});

/*
 *  Endpoint - api/v1/profile
 *  Method - GET
 *  Desc - Gets all profiles
 *  Access - Public
 */
exports.getAllProfiles = asyncHandler(async (req, res, next) => {
    // get all profiles
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);

    // send response
    res.status(200).json({
        success: true,
        count: profiles.length,
        data: profiles,
    });
});

/*
 *  Endpoint - api/v1/profile/user/:userid
 *  Method - GET
 *  Desc - Gets profile by user id
 *  Access - Public
 */
exports.profileByUserID = asyncHandler(async (req, res, next) => {

    // get profile by user id
    const profile = await Profile.findOne({
        user: req.params.userid,
    }).populate("user", ["name", "avatar"]);

    if (!profile) {
        return next(new ErrorResponse('No profile exists for the user', 400));
    }

    // send response
    res.status(200).json({
        success: true,
        data: profile,
    });
});

/*
 *  Endpoint - api/v1/profile
 *  Method - DELETE
 *  Desc - Deletes Profile, Posts and User
 *  Access - Private
 */
exports.deleteProfilePostsUser = asyncHandler(async (req, res, next) => {

    // Delete Posts - to be done later

    // Delete Profile
    await Profile.findOneAndRemove({
        user: req.user.id
    });

    // Delete User
    await User.findOneAndRemove({
        _id: req.user.id
    });

    // return response
    res.status(200).json({
        success: true,
        msg: 'Posts, Profile, User deleted successfully'
    });
});

/*
 *  Endpoint - api/v1/profile/experience
 *  Method - PUT
 *  Desc - Create Profile Experience
 *  Access - Private
 */
exports.createProfileExperience = asyncHandler(async (req, res, next) => {

    // Experience body
    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    } = req.body;

    const newExperience = {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    };

    // find the profile to add the experience
    const profile = await Profile.findOne({
        user: req.user.id
    });

    // add the new experience
    profile.experience.unshift(newExperience);

    // save to database
    await profile.save();

    // send response
    res.status(200).json({
        success: true,
        message: 'Experience added successfully!',
        data: profile
    });

});

/*
 *  Endpoint - api/v1/profile/experience/:expid
 *  Method - DELETE
 *  Desc - Delete Profile Experience
 *  Access - Private
 */
exports.deleteProfileExperience = asyncHandler(async (req, res, next) => {

    // find the profile
    const profile = await Profile.findOne({
        user: req.user.id
    });

    // Get the index of the experience to be removed
    const removeIndexExp = profile.experience.map(item => item._id).indexOf(req.params.expid);

    // Delete from profile
    profile.experience.splice(removeIndexExp, 1);

    // save to database
    await profile.save();

    // return response
    return res.status(200).json({
        success: true,
        msg: 'Profile Experience deleted successfully',
        data: profile
    });
});

/*
 *  Endpoint - api/v1/profile/education
 *  Method - PUT
 *  Desc - Create Profile Education
 *  Access - Private
 */
exports.createProfileEducation = asyncHandler(async (req, res, next) => {

    // Education body
    const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    } = req.body;

    const newEducation = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    };

    // find the profile to add the education
    const profile = await Profile.findOne({
        user: req.user.id
    });

    // add the new education
    profile.education.unshift(newEducation);

    // save to database
    await profile.save();

    // send response
    res.status(200).json({
        success: true,
        message: 'Education added successfully!',
        data: profile
    });

});

/*
 *  Endpoint - api/v1/profile/education/:eduid
 *  Method - DELETE
 *  Desc - Delete Profile Education
 *  Access - Private
 */
exports.deleteProfileEducation = asyncHandler(async (req, res, next) => {

    // find the profile
    const profile = await Profile.findOne({
        user: req.user.id
    });

    // Get the index of the education to be removed
    const removeIndexEdu = profile.education.map(item => item._id).indexOf(req.params.eduid);

    // Delete from profile
    profile.education.splice(removeIndexEdu, 1);

    // save to database
    await profile.save();

    // return response
    return res.status(200).json({
        success: true,
        msg: 'Profile education deleted successfully',
        data: profile
    });
});

/*
 *  Endpoint - api/v1/profile/github/:username
 *  Method - GET
 *  Desc - Gets the repo details of user
 *  Access - Public
 */
exports.getGitHubRepo = asyncHandler(async (req, res, next) => {

    // create options for Github API call
    const options = {
        uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}`,
        method: 'GET',
        headers: {
            'user-agent': 'node.js'
        }
    };

    request(options, (error, response, body) => {

        if (response.statusCode !== 200) {
            return next(new ErrorResponse('No GitHub Profile found', 400));
        }

        res.status(200).json({
            success: true,
            data: JSON.parse(body)
        })
    })
})