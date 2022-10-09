const express = require('express');
const regController = require('../routeController/regController');

const regRouter = express.Router()

regRouter.post('/',regController)

module.exports = regRouter;