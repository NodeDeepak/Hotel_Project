const Joi = require('joi');

const UserResource = require('./users.resource');
const _User = new UserResource();

const DataHelper = require('../../helpers/data.helpers');
const { ObjectId } = require('mongoose');
const _dataHelper = new DataHelper()


module.exports = class UserValidation {

    async createOne(req, res, next) {
        console.log("UserValidation@createOne")
        let schema = Joi.object({
            profilePhoto: Joi.string().optional(),
            name: Joi.string().required(),
            email: Joi.string().required(),
            password: Joi.string().required(),
            mobileNo: Joi.number().required(),
            address: Joi.string().required(),
            role: Joi.string().optional()
        })

        let errors = await _dataHelper.joiValidation(req.body, schema);
        if (errors) {
            return res.status(400).send({ status: 400, msg: 'Invalid request data', data: errors });
        }

        let user = await _User.checkEmail(req.body.email)
        if (user) {
            return res.status(400).send({ status: 400, msg: "Email already exists.", data: false })
        }

        next()
    }

    async login(req, res, next) {

        let schema = Joi.object({
            email: Joi.string().required(),
            password: Joi.string().required()
        })

        let error = await _dataHelper.joiValidation(req.body, schema);
        if (error) {
            return res.status(400).send({ status: 400, msg: "Something went wrong, please check and try again later.", data: false })
        }

        let user = await _User.checkEmail(req.body.email)
        if (!user) {
            return res.status(400).send({ status: 400, msg: "Please enter valid email.", data: false })
        }
        if (user.password !== req.body.password) {
            return res.status(400).send({ status: 400, msg: "Please enter valid password", data: false })
        }

        req.user = user
        next();

    }

    async forgotPassword(req, res, next) {

        let schema = Joi.object({
            email: Joi.string().required(),
        })

        let errors = await _dataHelper.joiValidation(req.body, schema);
        if (errors) {
            return res.status(400).send({ status: 400, msg: 'Invalid request data', data: errors });
        }

        let user = await _User.checkEmail(req.body.email);
        if (!user) {
            return res.status(400).send({ status: 400, msg: "Please enter valid email address", data: false })
        }

        req.user = user
        next();
    }

    async verifyOTP(req, res, next) {

        let schema = Joi.object({
            otp: Joi.string().required(),
        })

        let errors = await _dataHelper.joiValidation(req.body, schema);
        if (errors) {
            return res.status(400).send({ status: 400, msg: 'Invalid request data', data: errors });
        }

        next();
    }

    async resetPassword(req, res, next) {

        let schema = Joi.object({
            id: Joi.string().required(),
            new_Password: Joi.string().required(),
            confirm_Password: Joi.string().required()
            // .valid(Joi.ref('new_Password')).error( ()=> {
            //     return res.status(409).send({ status: 409, msg:"Confirm password should match to the password", data : false})
            // })
        })
        if (req.body.new_Password !== req.body.confirm_Password) {
            return res.status(409).send({ status: 409, msg: "Confirm password should match to the password", data: false })
        }

        let errors = await _dataHelper.joiValidation(req.body, schema);
        if (errors) {
            return res.status(400).send({ status: 400, msg: 'Invalid request data', data: errors });
        }

        let idCheck = await _User.checkById(req.body.id)
        if (!idCheck) {
            return res.status(400).send({ status: 400, msg: "Please enter id ", data: false })
        }

        req.user = idCheck
        next();

    }

    async changePassword(req, res, next) {

        let schema = Joi.object({
            old_Password: Joi.string().required(),
            new_Password: Joi.string().required(),
            confirm_Password: Joi.string().required()
        })

        let errors = await _dataHelper.joiValidation(req.body, schema);
        if (errors) {
            return res.status(400).send({ status: 400, msg: 'Invalid request data', data: errors });
        }

        if (req.user.password !== req.body.old_Password) {
            return res.status(400).send({ status: 400, msg: "Please enter the right old password", data: false });
        }

        if (req.body.new_Password !== req.body.confirm_Password) {
            return res.status(409).send({ status: 409, msg: "Confirm password should match to the password", data: false });
        }

        next();
    }

    async updateProfile(req, res, next) {
        console.log("UserValidation@updateProfile")
        let schema = Joi.object({
            profilePhoto: Joi.string().optional(),
            name: Joi.string().required(),
            mobileNo: Joi.number().required(),
            address: Joi.string().required(),
            role: Joi.string().optional()
        })

        let errors = await _dataHelper.joiValidation(req.body, schema);
        if (errors) {
            return res.status(400).send({ status: 400, msg: 'Invalid request data', data: errors });
        }

        // let user = await _User.checkEmail(req.body.email)
        // if (user) {
        //     return res.status(400).send({ status: 400, msg: "Email already exists.", data: false })
        // }

        next()
    }

}