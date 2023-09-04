const Joi = require('joi')

const identifySchema = Joi.object({
    email: Joi.string().email(),
    phoneNumber: Joi.string().max(10).min(10)
})

module.exports = identifySchema