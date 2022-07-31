const Task = require('../models/Task')
const asyncWrapper = require('../middleware/async')

const getAllTasks = asyncWrapper(async (req, res) => {
    const tasks = await Task.find()
    res.status(201).json({ tasks })
})

const createTask = asyncWrapper(async (req, res) => {
    const task = await Task.create(req.body)
    res.status(201).json({ task })
})

const getTask = asyncWrapper(async (req, res) => {
    const { id: taskid } = req.params
    const tasks = await Task.findOne({ _id: taskid })
    if (!tasks) {
        return res.status(404).json({ msg: `No task with ID ${taskid} exists` })
    }
    res.status(201).json({ tasks })
})

const updateTask = asyncWrapper(async (req, res) => {
    const { id: taskid } = req.params
    const tasks = await Task.findOneAndUpdate({ _id: taskid }, req.body, { new: true, runValidators: true })
    if (!tasks) {
        return res.status(404).json({ msg: `No task with ID ${taskid} exists` })
    }
    res.status(201).json({ tasks })
})

const deleteTask = asyncWrapper(async (req, res) => {
    const { id: taskid } = req.params
    const tasks = await Task.findOneAndDelete({ _id: taskid })
    if (!tasks) {
        return res.status(404).json({ msg: `No task with ID ${taskid} exists` })
    }
    res.status(201).json({ tasks })
})

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}