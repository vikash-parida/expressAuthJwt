const express = require('express');
const router = express.Router();
const usersController = require('../controller/userController.js');
const checkAuth = require('../middleware/auth_user.js');

//router.use('/changepassword',checkAuth.checkUserAuth)

// public Router
router.post('/register',usersController.UserRegister);
router.post('/login',usersController.UserLogin);




// protected Router

router.post('/changepassword',checkAuth.checkUserAuth,usersController.changeUserPassword)







module.exports = router ;