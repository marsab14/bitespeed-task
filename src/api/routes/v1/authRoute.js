const express = require('express')
const RouteLayer = require('../../../common/libs/routers/routerLayer')
const {login} = require('../../controllers/v1/authController')


const authRoute = express.Router()

authRoute.get('/login', RouteLayer.handleRESTReq(login))


module.exports = authRoute