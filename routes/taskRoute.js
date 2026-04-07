const express = require('express')
const taskController = require('../controllers/taskController')
const{auth,admin} = require('../middleware/auth')

const router = express.Router()

router.post('/create',auth,admin, taskController.createTask)
 
router.get('/getAllTasks',taskController.findALLTasks)

router.get('/getTask/:task_id', taskController.getTaskById)

router.put('/updateTaskByAdmin/:task_ID',auth,admin ,taskController.updateTaskByAdmin)

router.patch('/updateTaskStatus/:task_ID', auth, taskController.updateTaskStatus)

router.delete('/deleteTask/:task_ID',auth,admin ,taskController.deleteTask)


module.exports = router