const UserResource = require('./users.resource');
const _User = new UserResource();

const config = require('../../config/mongodbConnection');
const randomString = require("randomstring")

module.exports = class UserController {

    async createOne( req, res){
        console.log("UserController@createOne")

        let data = req.body

        let userObj = { 
            email: data.email,
            password: data.password,
            userInfo:{
                profilePhoto: data.profilePhoto,
                name: data.name,
                mobileNo: data.mobileNo,
                address: data.address,
            }
        }

        let user = await _User.createOne(userObj)
        if(!user){
            return res.status(400).send({ status: 400, msg: "User not created", data: false})
        }
        return res.status(200).send({ status: 200, msg: "User created successfully", data: user})
    }

    async login (req, res){

        let user = await _User.updateOne({email: req.user.email})
        if(!user){
            return res.status(400).send({ status: 400, msh: "User not found with this email", data: false})
        }
        return res.status(200).send({ status: 200, msg: "User login successfully", data: user})
    }

    async forgotPassword(req, res){

        let otp = Math.floor(1000 + Math.random() * 9000);

        let user = await _User.updateOne( req.user._id, {otp : otp});
        if(!user){
            return res.status(400).send({ status: 400, msg: "Please enter valid OTP", data: false})
        }
        return res.status(200).send({ status: 200, msg: "OTP send successfully.", data: user})
    }

    async verifyOTP(req, res){

        let verifyOTP = await _User.findOne(req.body.otp, {otp: otp})

        if(!verifyOTP){
            return res.status(400).send({ status: 400, msg: "Please enter valid OTP", data: false})
        }
        return res.status(200).send({ status: 200, msg: "OTP verified successfully.", data: verifyOTP})
    }

    
    async resetPassword(req, res){

    }

    async changePassword(req, res){

    }
}