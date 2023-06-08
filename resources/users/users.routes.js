const express = require('express');
const routes = express.Router();

const UserValidation = require('./users.validation');
const Validation = new UserValidation();

const UserController = require('./users.controller');
const user = new UserController();

const Auth = require('../../middleware/auth');
const auth = new Auth();


// Signup
routes.post('/signup', [Validation.createOne], user.createOne);

// Login
routes.post('/login', [Validation.login], user.login);

// Forgot Password
routes.post('/forgot-password', [Validation.forgotPassword], user.forgotPassword);

// Verify OTP
routes.post('/verify-OTP', [Validation.verifyOTP], user.verifyOTP);

// Reset Password
routes.post('/reset-password', [Validation.resetPassword], user.resetPassword);

// Change password after login user
routes.post('/change-password', [auth.verifyToken, Validation.changePassword], user.changePassword);

// Update profile
routes.post('/update-profile', [auth.verifyToken, Validation.updateProfile], user.updateProfile);

module.exports = routes;