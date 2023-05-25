const express = require('express');
const routes = express.Router();

const UserValidation = require('./users.validation');
const Validation = new UserValidation();

const UserController = require('./users.controller');
const userController = new UserController();

// Signup
routes.post('/signup', Validation.createOne, userController.createOne);

// TO Do complete all auth api user and business>>>>>>>>>>>>>>>>>>>>>>> =====

// Login
routes.post('/login', Validation.login, userController.login);

// Forgot Password
routes.post('/forgot-password', Validation.forgotPassword, userController.forgotPassword);

// Verify OTP
routes.post('/verify-OTP', Validation.verifyOTP, userController.verifyOTP);

// Reset Password
routes.post('/reset-password', Validation.resetPassword, userController.resetPassword);

// Change password
routes.post('/change-password', Validation.changePassword, userController.changePassword);
 

module.exports = routes;