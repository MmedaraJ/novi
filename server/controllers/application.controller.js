const { Application: Application } = require("../models/application.model");
require('dotenv').config();

module.exports.createApplication = (request, response) => {
    const {
        user_id,
        job_id
    } = request.body;

    Application.create({
        user_id,
        job_id
    }).then(application => {
        console.log(application);
        response.json(application);
    }).catch(err => {
        console.log(err);
        response.status(400).json(err);
    });
}

module.exports.getAllApplications = (request, response) => {
    Application.find({})
        .then(applications => response.json(applications))
        .catch(err => console.log(err));
}