/* File for Profile Model */

// Dependencies
const mongoose = require('mongoose');

// Profile Schema
const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    company: {
        type: String,
    },
    website: {
        type: String,
    },
    location: {
        type: String,
    },
    status: {
        type: String,
        required: [true, 'Please provide a status']
    },
    skills: {
        type: [String],
        required: [true, 'Please add a skills for profile'],
        validate: {
            validator: function (array) {
                return array.length > 0
            }
        }
    },
    bio: {
        type: String,
    },
    githubusername: {
        type: String
    },
    experience: [{
        title: {
            type: String,
            required: [true, 'Please add a title for experience'],
        },
        company: {
            type: String,
            required: [true, 'Please add a company for experience'],
        },
        location: {
            type: String,
        },
        from: {
            type: Date,
            required: [true, 'Please add a staring date for experience'],
        },
        to: {
            type: Date,
        },
        current: {
            type: Boolean,
            default: false
        },
        description: {
            type: String
        }
    }],
    education: [{
        school: {
            type: String,
            required: [true, 'Please add a school name'],
        },
        degree: {
            type: String,
            required: [true, 'Please add a degree for school'],
        },
        fieldofstudy: {
            type: String,
            required: [true, 'Please add a field of study of your school'],
        },
        from: {
            type: Date,
            required: [true, 'Please add a staring date for school'],
        },
        to: {
            type: Date,
        },
        current: {
            type: Boolean,
            default: false
        },
        description: {
            type: String
        }
    }],
    social: {
        github: {
            type: String,
        },
        facebook: {
            type: String,
        },
        linkedin: {
            type: String,
        },
        youtube: {
            type: String
        },
        instagram: {
            type: String
        }
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Profile', ProfileSchema);