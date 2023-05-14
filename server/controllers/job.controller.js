const { Job: Job } = require("../models/job.model");
require('dotenv').config();
const { Client } = require('@elastic/elasticsearch');
const client = new Client({ node: 'http://localhost:9200' });

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
        yearly_compensation,
        hourly_compensation,
        max_hourly_compensation,
        max_yearly_compensation,
        range,
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
        yearly_compensation,
        hourly_compensation,
        max_hourly_compensation,
        max_yearly_compensation,
        range,
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
    }).then(job => {
        response.json(job);
        console.log(job);
    }).catch(err => {
        console.log(err);
        response.status(400).json(err);
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

module.exports.searchJobs = (request, response) => {
  const { 
    keyword,
    location,
    location_type,
    job_type,
    category,
    job_language,
    salary_estimate,
    date_posted,
    date_sort
  } = request.query;

  const must = [];

  const keywordFields = [
    "title",
    "complete_location",
    "country",
    "province",
    "city",
    "location_type",
    "types",
    "category",
    "description",
    "description_summary",
    "intro",
    "company_name",
    "responsibilities",
    "qualifications",
    "extra_description",
    "benefits",
    "schedule",
    "experience",
    "language_requirement",
    "certification",
    "compensation_frequency",
    "compensation",
    "max_compensation",
    "compensation_info",
    "application_instruction",
  ];
  let boostedFields = keywordFields.map((field, index) => `${field}^${keywordFields.length - index}`);
  keyword && must.push({ 
    "multi_match": { 
      "query": keyword,
      "type": "best_fields",
      "fields": boostedFields
    } 
  });

  const locationFields = [
    "complete_location",
    "city",
    "province",
    "country",
  ];
  let boostedLocationFields = locationFields.map((field, index) => `${field}^${locationFields.length - index}`);
  location && must.push({ 
    "multi_match": { 
      "query": location,
      "type": "best_fields",
      "fields": boostedLocationFields
    } 
  });

  //const must = [];

  let gte = "";
  let lte = "";
  if (date_posted){
    console.log(`date postoided ${date_posted}`);
    switch(date_posted){
      case "hour":
        gte = "now-1h/h";
        lte = "now/h";
        break;
      case "day":
        gte = "now-1d/d";
        lte = "now/d";
        break;
      case "three-days":
        gte = "now-3d/d";
        lte = "now/d";
        break;
      case "week":
        gte = "now-1w/w";
        lte = "now/w";
        break;
      case "three-days":
        gte = "now-3d/d";
        lte = "now/d";
        break;
      case "fourteen-days":
        gte = "now-14d/d";
        lte = "now/d";
        break;
      case "month":
        gte = "now-1M/M";
        lte = "now/M";
        break;
    }

    console.log(`gte lte ${gte} ${lte}`);
    
    must.push({
      "range": {
        "createdAt": {
          "gte": gte,
          "lte": lte
        }
      }
    });
  }

  location_type && must.push({
    "match": {
      "location_type": location_type
    }
  });

  job_type && must.push({
    "match": {
      "types": job_type
    }
  });

  category && must.push({
    "match": {
      "category": category
    }
  });

  job_language && must.push({
    "match": {
      "language_requirement": job_language
    }
  });

  salary_estimate && must.push({
    "range": {
      "hourly_compensation": {
        "gte": parseInt(salary_estimate*100)
      }
    }
  });

  client.search({
    index: 'jobs',
    body: {
      "query": {
        "bool": {
          "must": must,
          //"filter": must
        }
      }
    }
  }).then(jobs => {
    console.log(jobs);
    response.json({jobs});
  }).catch(err => {
    console.log(err);
    response.status(400).json(err);
  });
}