const UserResource = require('./users.resource');
const _User = new UserResource();

const config = require('../../config/mongodbConnection');
const randomString = require("randomstring")

const Jwt = require('jsonwebtoken');

module.exports = class UserController {

    async createOne(req, res) {
        console.log("UserController@createOne")

        let data = req.body;
        let userObj;

        if (data.role === "business") {

            userObj = {
                email: data.email,
                password: data.password,
                businessInfo: {
                    businessProfilePhoto: data.profilePhoto,
                    businessName: data.name,
                    mobileNo: data.mobileNo,
                    address: data.address,
                },
                role: data.role,
                isVerified: true,
            }

        } else {

            userObj = {
                email: data.email,
                password: data.password,
                userInfo: {
                    profilePhoto: data.profilePhoto,
                    name: data.name,
                    mobileNo: data.mobileNo,
                    address: data.address,
                }
            }

        }

        let user;
        user = await _User.createOne(userObj)

        const token = Jwt.sign({ user_id: user._id, email: user.email }, "demo")

        user = await _User.updateOne(user._id, { "tokens.authToken": token })
        if (!user) {
            return res.status(400).send({ status: 400, msg: "User not created.", data: false })
        }
        return res.status(200).send({ status: 200, msg: "User created successfully.", data: user })

    }

    async login(req, res) {
        console.log("USERCONTROLLER@LOGIN")

        const token = Jwt.sign({ user_id: req.user._id, email: req.user.email }, "demo")

        let user = await _User.updateOne(req.user._id, { "tokens.authToken": token })
        if (!user) {
            return res.status(400).send({ status: 400, msg: "User not allow for login.", data: false })
        }
        return res.status(200).send({ status: 200, msg: "User login successfull.", data: user })
    }

    async forgotPassword(req, res) {

        let otp = Math.floor(1000 + Math.random() * 9000);

        let otpSend = await _User.updateOne(req.user._id, { otp: otp })
        if (!otpSend) {
            return res.status(400).send({ status: 400, msg: "OTP not send.", data: false })
        }
        return res.status(200).send({ status: 200, msg: "OTP sent to registered email successfully.", data: otpSend.otp })
    }

    async verifyOTP(req, res) {

        let verify = await _User.findOtp(req.body.otp);
        if (!verify) {
            return res.status(400).send({ status: 400, msg: "Please enter valid OTP", data: false })
        }

        await _User.updateOne(verify._id, { otp: "" });
        return res.status(200).send({ status: 200, msg: "OTP verified successfully.", data: verify })
    }

    async resetPassword(req, res) {

        let reset = await _User.updateOne(req.user._id, { password: req.body.new_Password })
        if (!reset) {
            return res.status(400).send({ status: 400, msg: "Please enter valid Password", data: false })
        }
        return res.status(200).send({ status: 200, msg: "Password reset successfully.", data: reset })
    }

    async changePassword(req, res) {

        let change = await _User.updateOne(req.user._id, { password: req.body.new_Password })
        if (!change) {
            return res.status(400).send({ status: 400, msg: "Please enter valid Password", data: false })
        }
        return res.status(200).send({ status: 200, msg: "Password change successfully.", data: change })
    }

    async updateProfile(req, res) {

        let data = req.body;
        let userObj;

        if (data.role === "business") {

            userObj = {
                email: data.email,
                password: data.password,
                businessInfo: {
                    businessProfilePhoto: data.profilePhoto,
                    businessName: data.name,
                    mobileNo: data.mobileNo,
                    address: data.address,
                },
                role: data.role,
                isVerified: true,
            }

        } else {

            userObj = {
                email: data.email,
                password: data.password,
                userInfo: {
                    profilePhoto: data.profilePhoto,
                    name: data.name,
                    mobileNo: data.mobileNo,
                    address: data.address,
                }
            }

        }

        let update = await _User.updateOne( req.user._id , userObj)
        if (!update) {
            return res.status(400).send({ status: 400, msg: "Profile not updated.", data: false })
        }
        return res.status(200).send({ status: 200, msg: "Profile updated successfully.", data: update })
    }

}