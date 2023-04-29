const UserController = require('../controllers/user.controller');

module.exports = function(app){
    app.post('/api/user/create', UserController.createUser);
    app.get('/api/users/get', UserController.getAllUsers);
    app.post('/api/user/login', UserController.login);
    app.post('/api/user/logout', UserController.logout);
    app.get('/api/users/delete', UserController.deleteAllUsers);
    app.post('/api/send-code', UserController.sendPhoneNumberConfirmationCode);
    app.post('/api/verify-code', UserController.verifyPhoneNumberConfirmationCode);
}
