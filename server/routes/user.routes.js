const UserController = require('../controllers/user.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = function(app){
    app.post('/api/user/create', UserController.createUser);
    app.get('/api/users/get', UserController.getAllUsers);
    app.post('/api/user/getGoogleUser', UserController.getOneUserWithGoogleSignInId);
    app.post('/api/user/get', UserController.getOneUser);
    app.post('/api/user/login', UserController.login);
    app.post('/api/user/logout', UserController.logout);
    app.post('/api/user/updateEmail', UserController.updateEmail);
    app.post('/api/user/updateNames', UserController.updateNames);
    app.post('/api/user/verifyPassword', UserController.verifyPassword);
    app.post('/api/user/updatePassword', UserController.updatePassword);
    app.post('/api/user/updatePhoneNumber', UserController.updatePhoneNumber);
    app.post('/api/user/updateResumeName', UserController.updateResumeName);
    app.get('/api/users/delete', UserController.deleteAllUsers);
    app.post('/api/send-code', UserController.sendPhoneNumberConfirmationCode);
    app.post('/api/verify-code', UserController.verifyPhoneNumberConfirmationCode);
    app.post('/api/updatePhoneNumberVerified', UserController.updatePhoneNumberVerifiedForUser);
}
