const Joi = require('joi')


module.exports = class DataHelper{

    async joiValidation(reqBody, schema) {
        console.log('DataHelper@joiValidation');

        let errors = schema.validate(reqBody,{"convert": false});

        let parsedErrors = [];

        if (errors.error) {
            errors = errors.error.details

            for (let e = 0; e < errors.length; e++) {
                let msg = errors[e].message
                msg = msg.replace(/["']/g, "")
                msg = msg.charAt(0).toUpperCase() + msg.slice(1)
                parsedErrors.push(msg.replace(/_/g, ' '))
            }
        }

        if (parsedErrors.length > 0) {
            return parsedErrors;
        }

        return false;
    }
}