import React, { useState } from "react";
import FormModal from "./FormModal";
import { FormControl, FormLabel, Input, Select } from "@chakra-ui/react";

const UpdateTaskForm = ({ isOpen, onClose, onSubmit, task }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [dueDate, setDueDate] = useState(task.dueDate);
  const [priority, setPriority] = useState(task.priority);
  const [status, setStatus] = useState(task.status);

  const handleSubmit = () => {
    onSubmit({ id: task._id, title, description, dueDate, priority, status });
    onClose();
  };

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Update Task"
    >
      <FormControl>
        <FormLabel>Title</FormLabel>
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Description</FormLabel>
        <Input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Priority</FormLabel>
        <Input
          type="text"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Status</FormLabel>
        <Select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </Select>
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Due Date</FormLabel>
        <Input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </FormControl>
    </FormModal>
  );
};

export default UpdateTaskForm;
