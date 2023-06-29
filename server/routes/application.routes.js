const ApplicationController = require('../controllers/application.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = function(app){
    app.post('/api/application/create', ApplicationController.createApplication);
    app.get('/api/application/getAll', ApplicationController.getAllApplications);
}