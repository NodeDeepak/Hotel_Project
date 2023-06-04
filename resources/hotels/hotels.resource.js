const Business = require('../users/user.module');

module.exports = class BusinessResource {

    async createOne(data) {

        if (data == '') {

            throw new Error('Please enter details.')
        }

        let result = await Business.create({ data: data })
        if (!result) {
            return false
        }
        return result
    }

    async checkEmail(email) {

        if (email == '') {

            throw new Error('Please enter email address.')
        }

        let result = await Business.findOne({ email: email })
        if (!result) {

            return false
        }
        return result
    }

    async updateOne(id, data){

        let result = await Business.findByIdAndUpdate(id, data, { new : true})
        if (!result) {
            return false
        }
        return result
    }

    async checkById(id){

        let result = await Business.findOne({_id : id})
        if (!result) {
            return false
        }
        return result
    }

}