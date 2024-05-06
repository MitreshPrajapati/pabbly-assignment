const Task = require("../models/Task");

// CRUD operations 
const createTask = async (req, res) => {
    const { userId, title, description, status, priority, dueDate } = req.body;
    // console.log(userId);
    const newTask = await Task({
        userId,
        title,
        description,
        status,
        priority,
        dueDate
    });

    await newTask.save();
    res.send({ message: 'Task saved successfully' })
}

const getTasks = async (req, res) => {
    const { userId } = req.body;

    try {
        const tasks = await Task.find({ userId });
        res.send(tasks);
    } catch (error) {
        res.send({ message: error })
    }
}

const deleteTask = async (req, res) => {
    const { id } = req.params;
    if (id) {
        const task = await Task.findByIdAndDelete({ _id: id, userId: req.body.userId });
        res.send({ message: "Task deleted" })
    } else {
        res.send({ message: "Task doesn't exists" });
    }
}

const updateTask = async (req, res) => {
    const { id } = req.params;
    const updatedTask = req.body;
    // console.log(updatedTask, id)
    const task = await Task.findByIdAndUpdate(id, updatedTask);
    if (task) {
        res.send({ message: 'Task updated successfully' });
    } else {
        res.send({ message: "Task doesn't exists." })
    }
}


// Assignee functions
const addAssignee = async (req, res) => {
    const { id } = req.params;
    const { userId, assigneeId, assignee_status } = req.body;
    const task = await Task.findById(id);
    if (!task) {
        res.send({ message: "Task doesn't exists" });
    }
    else if (task.userId === userId) {

        const isPresent = task.assignee.filter((user) => user.assigneeId === assigneeId)
        if (isPresent) {
            await task.updateOne({
                $pull: {
                    assignee:
                        { assigneeId: assigneeId }
                }
            });

            await task.updateOne({
                $push: {
                    assignee:
                        { assigneeId: assigneeId, assignee_status: assignee_status }
                }
            });
        } else {
            await task.updateOne({
                $push: {
                    assignee:
                        { assigneeId: assigneeId, assignee_status: assignee_status }
                }
            });
        }

        res.send({ message: 'Task assigned successfully' })
    } else {
        res.send({ message: "Not Authorized" });
    }

}

const getAssignedTasks = async (req, res) => {
    const { userId } = req.body;

    const tasks = await Task.find({ "assignee": { $elemMatch: { "assigneeId": userId } } });
    // console.log(userId, tasks)
    if (tasks.length > 0) {
        res.send({ assignedTasks: tasks });
    } else {
        res.send({ message: "Task not found" });
    }
}

const updateAssignedTask = async (req, res) => {
    const { userId, status } = req.body; // assigneeId
    const { id } = req.params;  //task id 

    const task = await Task.findOneAndUpdate(
        { "_id": id, "assignee.assigneeId": userId },
        { $set: { "assignee.$[elem].assignee_status": status } },
        {
            new: true,
            arrayFilters: [{ "elem.assigneeId": userId }]
        }
    ).exec()
        .then(result => {
            if (!result) {
                res.send({ message: "Task not found or user not assigned to task." });
            } else {
                res.send({ message: "Task updated successfully" })
            }
        })
        .catch(err => {
            res.send({ message: err })
        });


}

module.exports = {
    createTask,
    getTasks,
    updateTask,
    deleteTask,
    addAssignee,
    getAssignedTasks,
    updateAssignedTask,
}
