const User = require('./user.module');

module.exports = class UserResource{

    async checkEmail(checkEmail){

        if(email ===''){
            return new Error ('Please enter email address');
        }

        let result = await User.findOne({email: email})
        if(!result){
            return false
        }
        return result
    }

    async createOne(user){

        if(user === ''){
            return new Error ('Please enter details')
        }

        let result = await User.create(user)
        if(!result){
            return false
        }
        return result
    }

    async updateOne(id, data){

        let result = await User.findByIdAndUpdate(id, data,{new: true })
        if(!result){
            return false
        }
        return result
    }

    async findOne(otp){

        let result = await User.findOne({otp: otp})
        if(!result){
            return false
        }
        return result
    }
}