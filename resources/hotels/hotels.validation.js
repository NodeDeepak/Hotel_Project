const Joi = require('joi');

const BusinessResource = require('./hotels.resource');
const _Business = new BusinessResource();

const DataHelper = require('../../helpers/data.helpers');
const _dataHelper = new DataHelper();

module.exports = class BusinessValidation {

    async createOne(req, res, next) {

        let schema = Joi.object({
            photos: { type: String, default: "" },
            title: { type: String, default: "" },
            description: { ttype: String, default: "" },
            address: { type: String, default: "" },
            roomNo: { type: String, default: "" },
            startDate: { type: String, default: "" },
            endDate: { type: String, default: "" },
            created_at: { type: Date, default: Date.now },
        })

        let error = await _dataHelper.joiValidation(req.body, schema);
        if (error) {
            return res.status(400).send({ status: 400, msg: "Please enter valid detials", data: error })
        }
        next()
    }

}