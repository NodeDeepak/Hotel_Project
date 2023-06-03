const express = require('express');
const routes = express.Router();

const UserValidation = require('./users.validation');
const Validation = new UserValidation();

const UserController = require('./users.controller');
const user = new UserController();

// Signup
routes.post('/signup', Validation.createOne, user.createOne);

// TO Do complete all auth api user and business>>>>>>>>>>>>>>>>>>>>>>> =====

// Login
routes.post('/login', Validation.login, user.login);

// Forgot Password
routes.post('/forgot-password', Validation.forgotPassword, user.forgotPassword);

// Verify OTP
routes.post('/verify-OTP', Validation.verifyOTP, user.verifyOTP);

// Reset Password
routes.post('/reset-password', Validation.resetPassword, user.resetPassword);

// Change password
routes.post('/change-password', Validation.changePassword, user.changePassword);
 

module.exports = routes;