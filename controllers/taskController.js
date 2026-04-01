const Task = require('../models/taskModel')


async function createTask(req, res) {


    try {

        console.log(req.body)
        newTask = await Task.create(req.body)
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

// Get task by ID
async function getTaskById(req, res) {
    try {
        const { id } = req.params
        const task = await Task.findOne({ where: { id: id } })

        if (!task) {
            return res.status(404).send({ success: false, msg: "Task not found" })
        }

        res.status(200).send({ success: true, task: task })

    } catch (error) {
        res.status(500).send({ success: false, msg: "Server Error" })
    }
}

// Update task
async function updateTask(req, res) {
    try {
        await Task.update(req.body, { where: {} })
        res.status(200).send({ success: true, msg: "Task updated successfully" })

    } catch (error) {
        res.status(500).send({ success: false, msg: "Server Error" })
    }
}

// Delete task
async function deleteTask(req, res) {
    try {
        await Task.destroy({ where: {} })
        res.status(200).send({ success: true, msg: "Task deleted successfully" })

    } catch (error) {
        res.status(500).send({ success: false, msg: "Server Error" })
    }
}


module.exports = {
    createTask,
    findALLTasks,
    getTaskById,
    updateTask,
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