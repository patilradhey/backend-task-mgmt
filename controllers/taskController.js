const Task = require('../models/taskModel')


async function createTask(req, res) {


    try {

        console.log(req.body)
        const{title,description,startDate,endDate,status,priority} = req.body
       const Id = req.user.ID
        newTask = await Task.create({
            title:title,
            description:description,
            startDate:startDate,
            endDate:endDate,
            status:status || 'pending',
            priority:priority || 'low',
            createdBy:Id,
            updatedBy:Id
        })
        console.log(newTask)
        res.status(200).send({ success: true, msg: "Task created successfully" })


    } catch (error) {
        res.status(500).send({ success: false, msg: "Server Error" })

    }

}

// create new funciton for get aLl tasks 
async function findALLTasks(req,res){
    try {

        const allTasks = await Task.findAll()
        res.status(200).send({ success: true, tasks:allTasks })

         } catch (error) {
        res.status(500).send({ success: false, msg: "Server Error" })

    }

}

async function getTaskById(req, res) {
    try {
        const { task_id } = req.params
        const task = await Task.findByPk(task_id)

        if (!task) {
            return res.status(404).send({ success: false, msg: "Task not found" })
        }

        res.status(200).send({ success: true, task: task })

    } catch (error) {
        res.status(500).send({ success: false, msg: "Server Error" })
    }
}

// Update task by admin
async function updateTaskByAdmin(req, res) {
    req.body
    const task_id = req.params.task_ID

    const task = await Task.findByPk(task_id)
    if(!task){
        res.status(400).send({msg:"task not found"})
    }else{
        task.title = req.body.title || task.title,
        task.description = req.body.description || task.description,
        task.startDate = req.body.startDate || task.startDate,
        task.endDate = req.body.endDate || task.endDate,
        task.priority = req.body.priority || task.priority,
        task.status = req.body.status || task.status,
        task.updatedBy = req.user.ID

        await task.save()
        res.status(200).send({msg:"task updated successfully",success:true})
    }
}

// update task status
async function updateTaskStatus(req, res) {
    const task_id = req.params.task_ID
    const task = await Task.findByPk(task_id)

    if (!task) {
        res.status(400).send({ msg: "task not found" })
    } else {
        task.status = req.body.status || task.status

        await task.save()
        res.status(200).send({ msg: "Task status updated successfully", success: true })
    }
}

// Delete task
async function deleteTask(req, res) {
    try {
        const task = await Task.findByPk(req.params.task_ID)
        if(!task){
            res.status(400).send({msg:"Task not found"})
        }else{
            await task.destroy()
        }
        res.status(200).send({ success: true, msg: "Task deleted successfully" })

    } catch (error) {
        res.status(500).send({ success: false, msg: "Server Error" })
    }
}


module.exports = {
    createTask,
    findALLTasks,
    getTaskById,
    updateTaskByAdmin,
    updateTaskStatus,
    deleteTask
}

// {
//     "title":"Task 1",
//     "description":"rty rtyui ",
//     "priority":"high",
//     "status":"pending",
//     "startDate":"2026-10-29",
//     "endDate":"202-11-20",
// }