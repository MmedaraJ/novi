const UserController = require('../controllers/user.controller');
// const multer = require('multer');

// // Set up multer storage engine
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   }
// });

// // Initialize multer upload
// const upload = multer({ storage: storage });

module.exports = function(app){
    app.post('/api/user/create', UserController.createUser);
    app.get('/api/users/get', UserController.getAllUsers);
    app.post('/api/user/login', UserController.login);
    app.post('/api/user/logout', UserController.logout);
    app.get('/api/users/delete', UserController.deleteAllUsers);
    //app.post('/api/user/uploadFile', upload.single('file'), UserController.uploadFile);
}
