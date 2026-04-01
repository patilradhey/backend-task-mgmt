const express = require('express')
const taskController = require('../controllers/taskController')
const{auth,admin} = require('../middleware/auth')

const router = express.Router()

router.post('/create',auth,admin, taskController.createTask)
 
router.get('/getAllTasks',taskController.findALLTasks)

router.get('/getTask/:id', taskController.getTaskById)

router.put('/updateTask', taskController.updateTask)

router.delete('/deleteTask', taskController.deleteTask)


module.exports = router