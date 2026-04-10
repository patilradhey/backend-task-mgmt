const express = require('express')
const assignTaskController = require('../controllers/assignTaskController')
const { admin,auth } = require('../middleware/auth')
const { route } = require('./userRoute')
const router = express.Router()


router.post('/assign',auth,admin,assignTaskController.assign)

router.get('/my_tasks',auth,assignTaskController.my_tasks)

router.get('/allTasksWithUser',auth,admin,assignTaskController.allTaskWithUser)



module.exports = router