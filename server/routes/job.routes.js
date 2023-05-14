const JobController = require('../controllers/job.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = function(app){
    app.post('/api/job/create', JobController.createJob);
    app.get('/api/jobs/getAll', JobController.getAllJobs);
    app.get('/api/jobs/delete', JobController.deleteAllJobs);
    app.get('/api/jobs/search', JobController.searchJobs);
}