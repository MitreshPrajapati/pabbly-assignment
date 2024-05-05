const { Router } = require("express");
const { createTask, getTasks, updateTask, deleteTask, addAssignee, getAssignedTasks } = require("../controllers/taskController");

const taskRouter = Router();

taskRouter.post('/', createTask);
taskRouter.get('/', getTasks);
taskRouter.put('/:id', updateTask);
taskRouter.delete('/:id', deleteTask);
taskRouter.patch('/assign/:id', addAssignee);
taskRouter.get('/assigned-tasks', getAssignedTasks);

// taskRouter.get('/filter', async (req, res) => {
//     const filter = {};
//     const userId = req.body.userId;
//
//     if (req.query.status) {
//         if (req.query.status === 'ToDo') {
//             filter.status = 'To Do'
//         } else if (req.query.status === 'InProgress') {
//             filter.status = 'In Progress'
//         } else if (req.query.status === 'Done') {
//             filter.status = 'Done'
//         }
//
//     }
//     if (req.query?.priority) {
//         filter.priority = req.query.priority;
//     }
//     console.log(filter);
//     const tasks = await Task.find({ userId, ...filter });
//     res.send(tasks);
//
// });

module.exports = { taskRouter };