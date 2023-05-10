const mongoose = require('mongoose');
const URL_REGEX = /^(ftp|http|https):\/\/[^ "]+$/;
const EMAIL_REGEX = /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/;

function urlValidation(val){
    return URL_REGEX.test(val);
}

function emailValidation(val){
    return EMAIL_REGEX.test(val);
}

const JobSchema = new mongoose.Schema({
    title: { 
        type: String,
        required: [
            true,
            "Job title is required"
        ],
        trim: true,
    },
    location_type: {
        type: String,
        required: [
            true,
            "Location type is required"
        ],
        trim: true
    },
    country: { 
        type: String,
        trim: true
    },
    province: { 
        type: String,
        trim: true
    },
    city: { 
        type: String,
        trim: true
    },
    complete_location: { 
        type: String,
        trim: true
    },
    types: { 
        type: [String],
        required: [
            true,
            "Job types are required"
        ],
    },
    category: { 
        type: String,
        trim: true,
    },
    intro: { 
        type: String,
    },
    responsibilities: { 
        type: [String],
        trim: true
    },
    qualifications: { 
        type: [String],
        trim: true
    },
    extra_description: { 
        type: String,
        trim: true
    },
    benefits: { 
        type: [String],
        trim: true
    },
    schedule: { 
        type: [String],
        trim: true
    },
    experience: { 
        type: [String],
        trim: true
    },
    description: { 
        type: String,
        trim: true
    },
    language_requirement: { 
        type: [String],
        trim: true
    },
    certification: { 
        type: [String],
        trim: true
    },
    description_summary: { 
        type: [String],
        trim: true,
        required: [
            true,
            "Description summary is required"
        ],
    },
    currency: { 
        type: String,
        trim: true
    },
    compensation_frequency: { 
        type: String,
        trim: true
    },
    compensation: { 
        type: Number,
        trim: true,
        validate: {
            validator: Number.isInteger,
            message: 'Must be an integer',
        },
    },
    range: { 
        type: Boolean,
        required: true,
    },
    max_compensation: { 
        type: Number,
        trim: true,
        validate: {
            validator: val => Number.isInteger(val),
            message: 'Must be an integer',
        },
    },
    compensation_info: { 
        type: String,
        trim: true,
    },
    show_compensation: { 
        type: Boolean,
        required: true,
    },
    urgently_hiring: {
        type: Boolean,
        required: true
    },
    start_date: {
        type: Date
    },
    expiry_date: {
        type: Date
    },
    company_name: { 
        type: String,
        required: [
            true,
            "Company name is required"
        ],
        trim: true,
    },
    company_url: { 
        type: String,
        trim: true,
        validate: {
            validator: val => urlValidation(val),
            message: 'Invalid url',
        },
    },
    company_logo_url: { 
        type: String,
        trim: true,
        validate: {
            validator: val => urlValidation(val),
            message: 'Invalid url',
        },
    },
    company_email: { 
        type: String,
        required: [
            true,
            "Company email is required"
        ],
        trim: true,
        validate: {
            validator: val => emailValidation(val),
            message: "Please enter a valid company email"
        }
    },
    application_instruction: { 
        type: String,
        trim: true,
    },
    upgrade: { 
        type: String,
        trim: true,
    },
}, { timestamps: true });

module.exports.Job = mongoose.model('Job', JobSchema);