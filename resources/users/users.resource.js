const { request } = require('http');
const User = require('./user.module');

const Jwt = require('jsonwebtoken');
const jwtKey = 'projectHotel'

module.exports = class UserResource {

    async checkEmail(email) {
        console.log("UserResource@checkEmail")

        if (email === '') {
            throw new Error('Please enter email address');
        }

        let result = await User.findOne({ email: email })
        if (!result) {
            return false
        }
        return result
    }

    async createOne(data) {
        console.log("UserResource@createOne")


        if (data === '') {
            throw new Error('data ie required')
        }

        let result = await User.create(data)
        if (!result) {
            return false
        }
        return result
    }

    async updateOne(id, data) {

        let result = await User.findByIdAndUpdate(id, data, { new: true })
        if (!result) {
            return false
        }
        return result
    }

    async findOne(otp) {

        let result = await User.findOne({ otp: otp })
        if (!result) {
            return false
        }
        return result
    }

    // async verifyToken(req, res, next) {
    //     let token = req.header["Authorization"];
    //     if (token) {
    //         token = token.split('')[0];

    //         Jwt.verify(token, jwtKey, (error, valid) => {

    //             if (error) {

    //                 return res.status(400).send({ status: 401, msg: "Please provide a valid token.", data: false })

    //             }
    //             next()

    //         })
    //     }

    //     return res.status(400).send({ status: 400, msg: "Please enter a valid token.", data: false })

    // }
}