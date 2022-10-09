const express = require('express')
const logoutController = require('../routeController/logoutController')

const logutRotuer = express.Router()
logutRotuer.post('/',logoutController)

module.exports = logutRotuer