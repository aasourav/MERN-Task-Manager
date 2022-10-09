const express = require('express')
const addTaskController = require('../routeController/addTaskController')
const deleteTaskController = require('../routeController/deleteTaskController')
const editTaskController = require('../routeController/editTaskController')
const taskController = require('../routeController/taskController')
const verification = require('../util/verification')

const tasksRouter = express.Router()
tasksRouter.get('/',verification,taskController)
tasksRouter.delete('/:id',verification,deleteTaskController)
tasksRouter.put('/edit/:id',verification,editTaskController)
tasksRouter.post('/add',verification,addTaskController) 

module.exports = tasksRouter