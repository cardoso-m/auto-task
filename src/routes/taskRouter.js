const express = require('express')
const router = express.Router()
const taskController = require('../controllers/taskController')

router.post('/task', taskController.createTask)
router.get('/task', taskController.getTasks)
router.delete('/task/:id', taskController.deleteTask)
router.put('/task/:id', taskController.updateTask)

module.exports = router