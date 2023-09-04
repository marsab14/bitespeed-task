const express = require('express')
const RouteLayer = require('../../../common/libs/routers/routerLayer')
const validateRequest = require('../../../common/middleware/validateRequest')
const identifySchema = require('../../../common/libs/validations/identifySchema')
const { getContacts } = require('../../controllers/v1/identifyController')



const identifyRoute = express.Router()

identifyRoute.post('/', validateRequest(identifySchema, "body"), RouteLayer.handleRESTReq(getContacts))


module.exports = identifyRoute