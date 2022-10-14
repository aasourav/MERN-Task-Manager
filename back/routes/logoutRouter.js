const express = require('express')
const logoutController = require('../routeController/logoutController')
const verification = require('../util/verification')

const logutRotuer = express.Router()
logutRotuer.post('/',verification,logoutController)

module.exports = logutRotuer