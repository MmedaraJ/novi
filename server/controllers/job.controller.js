const { Job: Job } = require("../models/job.model");
require('dotenv').config();

module.exports.createJob = (request, response) => {
    console.log("request body: " + (JSON.stringify(request.body)));
    const {
        title,
        location_type,
        country,
        province,
        city,
        complete_location,
        types,
        category,
        intro,
        responsibilities,
        qualifications,
        extra_description,
        benefits,
        schedule,
        experience,
        language_requirement,
        certification,
        description,
        description_summary,
        currency,
        compensation_frequency,
        compensation,
        range,
        max_compensation,
        compensation_info,
        show_compensation,
        urgently_hiring,
        start_date,
        expiry_date,
        company_name,
        company_url,
        company_logo_url,
        company_email,
        application_instruction,
        upgrade,
    } = request.body;

    Job.create({
        title,
        location_type,
        country,
        province,
        city,
        complete_location,
        types,
        category,
        intro,
        responsibilities,
        qualifications,
        extra_description,
        benefits,
        schedule,
        experience,
        language_requirement,
        certification,
        description,
        description_summary,
        currency,
        compensation_frequency,
        compensation,
        range,
        max_compensation,
        compensation_info,
        show_compensation,
        urgently_hiring,
        start_date,
        expiry_date,
        company_name,
        company_url,
        company_logo_url,
        company_email,
        application_instruction,
        upgrade
    })
        .then(job => {
            response.json(job);
            console.log(job);
        })
        .catch(err => {
            console.log(err);
            response.status(400).json(err)
        });
}

module.exports.getAllJobs = (request, response) => {
    Job.find({})
        .then(jobs => response.json(jobs))
        .catch(err => console.log(err));
}

module.exports.deleteAllJobs = (request, response) => {
    Job.deleteMany({})
        .then(res => console.log(`All jobs deleted\n${res}`))
        .catch(err => console.log(err));
}