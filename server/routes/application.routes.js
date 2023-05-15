const ApplicationController = require('../controllers/application.controller');

module.exports = function(app){
    app.post('/api/application/create', ApplicationController.createApplication);
    app.get('/api/application/getAll', ApplicationController.getAllApplications);
}