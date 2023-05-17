const express = require('express');
const routes = express.Router();

const UserValidation = require('./users.validation');
const validation = new UserValidation;

const UserController = require('./users.controller');
const { valid } = require('joi');
const controller = new UserValidation;

//Signup
routes.post('/signup', validation.createOne, controller.createOne);

//Login
routes.post('/login', validation.login, controller.login);

//Forgot Password
routes.post('/forgot-password', validation.forgotPassword, controller.forgotPassword);

//Verify OTP
routes.post('/verify-OTP', validation.verifyOTP, controller.verifyOTP);

//Reset Password
routes.post('/reset-password', validation,resetPassword, controller.resetPassword);

//change password
routes.post('/change-password', validation.changePassword, controller.changePassword);
 