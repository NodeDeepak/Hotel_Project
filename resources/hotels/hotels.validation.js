const Joi = require('joi');

const BusinessResource = require('./hotels.resource');
const _Business = new BusinessResource();

const DataHelper = require('../../helpers/data.helpers');
const _dataHelper = new DataHelper();

module.exports = class BusinessValidation {

    async createOne(req, res, next) {

        let schema = Joi.object({

            businessProfilePhoto: { type: String, default: '' },
            businessName: { type: String, default: '' },
            email: { type: String, default: '' },
            password: { type: String, default: '' },
            mobileNo: { type: Number, default: '' },
            address: { type: String, default: '' },

        })

        let error = await _dataHelper.joiValidation(req.body, schema)
        if (error) {
            return res.status(400).send({ status: 400, msg: 'Invalid request data', data: error });
        }

        let emailCheck = await _Business.checkEmail(req.body.email)
        if (!emailCheck) {
            return res.status(400).send({ status: 400, msg: "Email already exists.", data: false })
        }

        next();

    }

    async login(req, res, next) {

        let schema = Joi.object({
            email: Joi.string().required(),
            password: Joi.string().required()
        })

        let error = await _Business.joiValidation(req.body, schema)
        if (!error) {
            return res.status(400).send({ status: 400, msg: "Plese enter valid email and password.", data: false })
        }

        let businessUser = await _Business.checkEmail(req.body.email)
        if (!businessUser) {
            return res.status(400).send({ status: 400, msg: "Please enter valid email adddress.", data: false })
        }

        if (businessUser.password !== req.body.password) {
            return res.status(400).send({staus: 400, msg: "Please enter valid password.", data: false})
        }

        req.businessUser= businessUser

        next();
    }

}