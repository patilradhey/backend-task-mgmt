const express = require('express')
const userController = require('../controllers/userConroller')
const {auth} = require('../middleware/auth')
const router = express.Router()

router.post('/register', userController.register)

router.post('/login',userController.login)

router.get('/getUserInfo',auth,userController.getUserInfo)

router.get('/getAllUsers', userController.getAllUsers)

router.patch('/updateUser/:user_ID',auth,userController.updateUser)

router.delete('/deleteUser/:id', userController.deleteUser)

module.exports = router