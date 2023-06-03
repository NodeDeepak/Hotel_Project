const Joi = require('joi');

const UserResource = require('./users.resource');
const _User = new UserResource();

const DataHelper = require('../../helpers/data.helpers')
const _dataHelper = new DataHelper()


module.exports = class UserValidation {

    async createOne(req,res, next){
        console.log("UserValidation@createOne")
        let schema = Joi.object({
            profilePhoto: Joi.string().optional(),
            name: Joi.string().required(),
            email: Joi.string().required(),
            password: Joi.string().required(),
            mobileNo: Joi.number().required(),
            address: Joi.string().optional()
        })

        let errors = await _dataHelper.joiValidation(req.body, schema);
        if(errors) {
            return res.status(400).send({ status : 400, msg:'Invalid request data', data : errors});
        } 

        let user = await _User.checkEmail(req.body.email)
        if(user){
            return res.status(400).send({ status: 400, msg:"email already exit", data: false})
        }

        next()
    }

    async login(req, res, next){

        let schema = Joi.object({
            email: Joi.string().required(),
            password: Joi.string().required()
        })

        let errors = await _dataHelper.joiValidation(req.body, schema);
        if(errors) {
            return res.status(400).send({ status : 400, data : errors});
        }

        let user = await _User.checkEmail(req.body.email)

        if(!user){
            return res.status(400).send({ status: 400, msg: "Please enter valid email.", data: false})
        }
        if(user.password !== req.body.password){
            return res.status(400).send({ status: 400, mesg: "Please enter valid password.", data: false})
        }
        
        req.user= user
        next();
    }

    async forgotPassword(req, res, next){

        let user = await _User.checkEmail(req.body.email);
        if(!user){
            return res.status(400).send({ status: 400, msg: "Please enter valid email address", data: false})
        }

        req.user= user
        next();
    }

    async verifyOTP (req, res, next){

        let otpCheck = await _User.findOne(req.body.otp)
        if(!otpCheck){
            return res.status(400).send({ status: 400, msg: "Please enter OTP", data: false})
        }

        req.user= otpCheck
        next();

    }

    async resetPassword(req, res, next){

        let schema = Joi.object({
            old_Password: Joi.string().required(),
            new_Password: Joi.string().required(),
            confirm_Password: Joi.string().required()
        })

        let errors = await _dataHelper.joiValidation(req.body, schema);
        if(errors) {
            return res.status(400).send({ status : 400, msg:'Invalid request data', data : errors});
        }

        let user = await _User.updateOne(req.bodt._id)
        if(user.password !== req.body.password){
            return response.status(400).send({ status: 400, msg: "Please enter valid old password", data: false})
        }

        if({
        }){

        }

        next()

    }

    async changePassword(req, res, next){

        let user = await _User.updateOne({_id: id})

        if (user.password != req.body.password){
            return res.status(400).send({ status : 400, msg:'Invalid request data', data : false});
        }
            
    }

}