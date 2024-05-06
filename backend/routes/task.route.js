const { Router } = require("express");
const { createTask,
    getTasks,
    updateTask,
    deleteTask,
    addAssignee,
    getAssignedTasks,
    updateAssignedTask } = require("../controllers/taskController");

const taskRouter = Router();

taskRouter.post('/', createTask);
taskRouter.get('/', getTasks);
taskRouter.put('/:id', updateTask);
// taskRouter.put('status/:id', updateTaskStatus);
taskRouter.delete('/:id', deleteTask);


taskRouter.patch('/assign/:id', addAssignee);
taskRouter.get('/assigned-tasks', getAssignedTasks);
taskRouter.patch('/assigned-status/:id', updateAssignedTask);

module.exports = { taskRouter };
