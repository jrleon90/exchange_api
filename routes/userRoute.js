const UserController = require('../controllers/userController');

module.exports = (app) => {
  app.post('/user/register', UserController.createUser);
  app.post('/user/login', UserController.logInUser);
};
