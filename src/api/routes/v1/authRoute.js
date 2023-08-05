const express = require('express')
const RouteLayer = require('../../../common/libs/routers/routerLayer')
const {login} = require('../../controllers/v1/authController')
const validateRequest = require('../../../common/middleware/validateRequest')
const { loginSchema } = require('../../../common/libs/validations/authSchema')


const authRoute = express.Router()

authRoute.post('/login', validateRequest(loginSchema),  RouteLayer.handleRESTReq(login))


module.exports = authRoute