const Joi = require('joi')

const loginSchema = Joi.object({
    userId: Joi.string().min(3).max(20).required(),
    password: Joi.string().min(6).max(20).required()
})

module.exports = {
    loginSchema
}