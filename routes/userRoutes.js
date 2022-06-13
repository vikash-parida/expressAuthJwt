const express = require('express');
const router = express.Router();
const usersController = require('../controller/userController.js');




// public Router
router.use('/register',usersController.UserRegister);
router.use('/login',usersController.UserLogin);




// protected Router









module.exports = router ;