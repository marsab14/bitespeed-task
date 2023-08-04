const express = require('express')
const config = require('../../config/index')
const HttpResponseHandler = require('../../common/helper/HttpResponseHandler')
const router = express.Router()
const routes = require('./v1/index')

router.get('/healthcheck', (req, res) => {
    const data = {
        timestamp: new Date(),
        buildNumber: config.node.buildNumber
    }

    HttpResponseHandler.success(req, res, data)

})

router.use('/v1', routes)

module.exports = router