const express = require('express')
const router = express.Router()
const identifyRoute = require('./identifyRoute')


router.use("/identify", identifyRoute)

module.exports = router