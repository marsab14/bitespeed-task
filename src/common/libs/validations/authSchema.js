const Joi = require('joi')

const loginSchema = Joi.object({
    loginId : Joi.string().min(3).max(20).required(),
    password: Joi.string().min(6).max(20).required()
})

const signUpSchema = Joi.object({
    loginId : Joi.string().min(3).max(20).required(),
    password: Joi.string().min(6).max(20).required()
})

module.exports = {
    loginSchema,
    signUpSchema
}