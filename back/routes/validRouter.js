const express = require('express');
const verifyUserCotroller = require('../routeController/verifyUserController');

const validRouter = express.Router()

validRouter.get('/',verifyUserCotroller)

module.exports = validRouter;