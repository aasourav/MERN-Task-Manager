const express = require('express')
const loginController = require('../routeController/loginController')

const loginRotuer = express.Router()
loginRotuer.post('/',loginController)

module.exports = loginRotuer