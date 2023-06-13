const express = require('express');
const routes = express.Router();

const BusinessValidation = require('./hotels.validation');
const Validation = new BusinessValidation();

const BusinessController = require('./hotels.controller');
const business = new BusinessController();

const Auth = require('../../middleware/auth')
const auth = new Auth();

//Create Room
routes.post('/create-room', [auth.verifyToken, Validation.createOne], business.createOne);

// Update Room detials
routes.post('/update-room', [auth.verifyToken, Validation.updateOne], business.updateOne);

// Delete Room detials
routes.post('/update-room', [auth.verifyToken, Validation.delete], business.delete);

module.exports = routes;