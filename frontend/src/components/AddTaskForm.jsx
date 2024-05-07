import React, { useState } from "react";
import FormModal from "./FormModal";
import {
  FormControl,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";

const AddTaskForm = ({ isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState('Pending');
  const [priority, setPriority] = useState("");

  const handleSubmit = () => {
    onSubmit({ title, description, dueDate, priority, status });
    onClose();
  };

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Add Task"
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
        <FormLabel>Due Date</FormLabel>
        <Input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Status</FormLabel>
        <Select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </Select>
      </FormControl>
    </FormModal>
  );
};

export default AddTaskForm;
