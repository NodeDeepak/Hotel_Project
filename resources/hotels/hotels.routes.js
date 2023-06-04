const express = require('express');
const routes = express.Router();

const BusinessValidation = require('./hotels.validation');
const Validation = new BusinessValidation();

const BusinessController = require('./hotels.controller');
const business = new BusinessController();

//Signup
routes.post('/signup', [Validation.createOne], business.createOne )

// Login
routes.post('/login', [Validation.login], business.login)

// Forgot Password
routes.post('/forgot-password', [Validation.forgotPassword], business.forgotPassword)

// Verify OTP
routes.post('/verify-OTP', [Validation.verifyOTP], business.verifyOTP)

// Reset Password
routes.post('/reset-password', [Validation.resetPassword], business.resetPassword)

// Change Password
routes.post('/change-password', [Validation.changePassword], business.changePassword)

module.exports = routes;