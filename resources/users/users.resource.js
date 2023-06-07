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

    async checkById(id){
        let result = await User.findOne({_id : id});
        if (!result) {
            return false
        }
        return result
    }
    
}