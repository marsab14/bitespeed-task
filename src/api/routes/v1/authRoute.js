const express = require('express')
const RouteLayer = require('../../../common/libs/routers/routerLayer')
const {login, signup} = require('../../controllers/v1/authController')
const validateRequest = require('../../../common/middleware/validateRequest')
const { loginSchema, signUpSchema } = require('../../../common/libs/validations/authSchema')


const authRoute = express.Router()

authRoute.get('/login', validateRequest(loginSchema, "query"),  RouteLayer.handleRESTReq(login))
authRoute.post('/signup', validateRequest(signUpSchema, "body"), RouteLayer.handleRESTReq(signup))


module.exports = authRoute