const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.post('/user', userController.createUser)
router.get('/user', userController.getUsers)
router.delete('/user/:id',userController.deleteUser)

module.exports = router