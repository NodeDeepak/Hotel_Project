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
            return res.status(400).send({ status: 400, msg:"Email already exit.",data: false})
        }

        next()
    }

    async login(req, res, next){

        let schema = Joi.object({
            email: Joi.string().required(),
            password: Joi.string().required()
        })

        let error = await _dataHelper.joiValidation(req.body, schema);
        if(error){
            return res.status(400).send({ status: 400, msg: "Something went wrong, please check and try again later.", data : false})
        }

        let user = await _User.checkEmail(req.body.email)
        if(!user){
            return res.status(400).send({ status: 400, msg : "User not found with this email.", data: false})
        }

        if(user.password !== req.body.password){
            return res.status(400).send({ status: 400, msg : "Please enter valid password", data: false})
        }

        req.user = user
        next();

        }

    async forgotPassword(req, res, next){

        let schema = Joi.object({
            email: Joi.string().required(),
        })

        let errors = await _dataHelper.joiValidation(req.body, schema);
        if(errors) {
            return res.status(400).send({ status : 400, msg:'Invalid request data', data : errors});
        } 

        let user = await _User.checkEmail(req.body.email);
        if(!user){
            return res.status(400).send({ status: 400, msg: "Email does not exit", data: false})
        }

        req.user= user
        next();
    }

    async verifyOTP (req, res, next){

        let schema = Joi.object({
            id: Joi.string().required(),
            otp: Joi.number().required(),
        })

        let errors = await _dataHelper.joiValidation(req.body, schema);
        if(errors) {
            return res.status(400).send({ status : 400, msg:'Invalid request data', data : errors});
        }  

        let userCheck  = await _User.findOne(req.body.id)
        console.log(userCheck,"userCheck @@@@")
        if(!userCheck){
            return res.status(400).send({ status: 400, msg: "Please enter valid user id ", data: false})
        }


        req.user= userCheck
        next();

    }

    async resetPassword(req, res, next){

        let schema = Joi.object({
            new_Password: Joi.string().required(),
            confirm_Password: Joi.string().required()
        })

        let errors = await _dataHelper.joiValidation(req.body, schema);
        if(errors) {
            return res.status(400).send({ status : 400, msg:'Invalid request data', data : errors});
        }

        let user = await _User.updateOne(req.body._id)
        if(user.password !== req.body.password){
            return response.status(400).send({ status: 400, msg: "Please enter valid password", data: false})
        }

        req.user = user
        next();

    }

    async changePassword(req, res, next){

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
            return response.status(400).send({ status: 400, msg: "Please enter valid password", data: false})
        }
        
        req.user = user

    }

}