const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, enum: ['Pending', 'Completed'], default: 'Pending' },
    priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
    dueDate: { type: Date },
    assignee: { type: Array, default: [] }
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
