import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  filter,
} from '@chakra-ui/react';
import './App.css';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import AddTaskForm from './components/AddTaskForm';
import UpdateTaskForm from './components/UpdateTaskForm';
import Navbar from './components/Navbar';
import { BASE_URL } from './API';
import Pagination from './components/Pagination';

function App() {
  const [isLoginFormOpen, setIsLoginFormOpen] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {});
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  const [isRegisterFormOpen, setIsRegisterFormOpen] = useState(false);
  const [isAddTaskFormOpen, setIsAddTaskFormOpen] = useState(false);
  const [isUpdateTaskFormOpen, setIsUpdateTaskFormOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [assignedTasks, setAssignedTasks] = useState([]);
  const [pendingAssignedTasks, setPendingAssignedTasks] = useState([]);
  const [CompletedAssignedTasks, setCompletedAssignedTasks] = useState([]);
  const [page, setPage] = useState(1);

  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleLogin = async (credentials) => {
    const payload = { ...credentials }
    const response = await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    const data = await response.json();
    if (data?.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
      setToken(data.token);
      setIsLoggedIn(true);
      handleGetTasks()
    }

    console.log('Logging in with:', credentials, data);
  };

  const handleRegister = async (userData) => {
    const payload = { ...userData }
    const response = await fetch(`${BASE_URL}/users/register`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    const data = await response.json();
    console.log('Registering with:', userData, data);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken('');
    setIsLoggedIn(false);
  };

  const handleAddTask = async (taskData) => {
    // Handle adding task logic
    const payload = { ...taskData };
    console.log('Adding task with payload:', payload)
    const response = await fetch(`${BASE_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authentication': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(payload)
    })
    const data = await response.json();
    console.log('Adding task:', taskData, data);
    handleGetTasks();
  };

  const handleGetTasks = async () => {
    const token = localStorage.getItem('token') || '';

    if (token) {
      const response = await fetch(`${BASE_URL}/tasks`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'authentication': `Bearer ${localStorage.getItem('token')}`
        }
      })

      const data = await response.json();
      console.log(data);
      setTasks(data);
      // return data;
    }
  }

  const handleGetAssignedTasks = async () => {
    const token = localStorage.getItem('token') || '';
    const user = JSON.parse(localStorage.getItem('user'));
    if (token) {
      const response = await fetch(`${BASE_URL}/tasks/assigned-tasks`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'authentication': `Bearer ${localStorage.getItem('token')}`
        }
      })

      const data = await response.json();
      if (data?.assignedTasks) {
        // console.log(data.assignedTasks)
        setAssignedTasks(data.assignedTasks);

        const filterOption = { status: true, id: user._id }
        console.log(filterOption, user)
        const completedTask = data.assignedTasks.filter(item => {
          return item.assignee.some(assignee => {
            return assignee.assigneeId === filterOption.id
              && assignee.assignee_status === filterOption.status;
          })
        })
        setCompletedAssignedTasks(completedTask)

        const pendingTask = data.assignedTasks.filter(item => {
          return item.assignee.some(assignee => {
            return assignee.assigneeId === filterOption.id
              && assignee.assignee_status !== filterOption.status;
          })
        })
        setPendingAssignedTasks(pendingTask)

        // console.log(pendingTask, completedTask)
      }
    }
  }

  const handleUpdateTask = async (updatedTask) => {
    // Handle updating task logic
    const token = localStorage.getItem('token') || '';
    const { id, status, title, priority, description, dueDate } = updatedTask;
    if (token) {
      const payload = { status, title, priority, description, dueDate }
      console.log(payload, id);
      const response = await fetch(`${BASE_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'authentication': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(payload)
      })

      const data = await response.json()
      console.log(data);
      handleGetTasks()
    }
  };

  const handleToggleTaskStatus = async (task) => {
    // Handle updating task logic
    const token = localStorage.getItem('token') || '';
    const { _id, status } = task;
    const id = _id;
    if (token) {
      const value = status === 'Completed' ? 'Pending' : 'Completed';
      const payload = { status: value }
      console.log(payload, id);
      const response = await fetch(`${BASE_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'authentication': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(payload)
      })

      const data = await response.json()
      // console.log(data);
      handleGetTasks();

    }
  };

  const handleDeleteTask = async (taskId) => {
    // Handle deleting task logic
    const response = await fetch(`${BASE_URL}/tasks/${taskId}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authentication': `Bearer ${localStorage.getItem('token')}`
      }
    });
    const data = await response.json();
    console.log('Deleting task:', taskId, data);
    handleGetTasks();
  };

  useEffect(() => {
    handleGetTasks();
    handleGetAssignedTasks();
  }, [])

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setIsLoggedIn(true)
    }
    // else {
    //   setIsLoginFormOpen(true)
    // }
  }, [isLoggedIn]);

  return (
    <Box display={'flex'} flexDir={'column'} bg={'blue.50'} minH={'100vh'} >
      <Navbar
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        setIsLoginFormOpen={setIsLoginFormOpen}
        setIsRegisterFormOpen={setIsRegisterFormOpen}
      />



      <LoginForm isOpen={isLoginFormOpen} onClose={() => setIsLoginFormOpen(false)} onSubmit={handleLogin} />
      <RegisterForm isOpen={isRegisterFormOpen} onClose={() => setIsRegisterFormOpen(false)} onSubmit={handleRegister} />
      {isLoggedIn ? <Box display={'flex'} flexDir={'column'} justifyContent={'center'} >
        
        <Button colorScheme='blue' mt={6} mx={'auto'} width={'15rem'} textAlign={'center'} onClick={() => setIsAddTaskFormOpen(true)}>Add Task</Button>
        <AddTaskForm isOpen={isAddTaskFormOpen} onClose={() => setIsAddTaskFormOpen(false)} onSubmit={handleAddTask} />

        <Box>
          <Heading as={'h1'} textAlign={'center'} mt={4} >Pending Assigned Tasks</Heading>

          <Flex mt={4} gap={4} px={4} justify={'center'} wrap={'wrap'}>
            {
              pendingAssignedTasks && pendingAssignedTasks?.map((task) => {
                return (
                  <Box key={task._id} minW={'200px'} p={4} bg={'blue.100'} borderRadius={4}>
                    <Text  >{task.title} <small>{task.dueDate.slice(0, 10)}</small> </Text>
                    <Text  >Description: {task.description}</Text>
                    <Text color={'navy'} fontWeight={'semibold'} >Pending</Text>
                  </Box>
                )
              })
            }
          </Flex>
        </Box>

        <Box>
          <Heading textAlign={'center'} mt={4}>Completed Assigned Tasks </Heading>
          <Flex mt={4} gap={4} px={4} justify={'center'} wrap={'wrap'}>
            {
              CompletedAssignedTasks && CompletedAssignedTasks?.map((task) => {
                return (
                  <Box key={task._id} minW={'200px'} p={4} bg={'blue.100'} borderRadius={4}>
                    <Text  >{task.title}</Text>
                    {/* <Text  >{task.title}</Text> */}
                    <Text color={'navy'} fontWeight={'semibold'} >Completed</Text>
                  </Box>
                )
              })
            }
          </Flex>
        </Box>


        <Heading textAlign={'center'} mt={4}> My Tasks</Heading>
        {tasks?.map(task => (
          <Box
            key={task._id}
            border="1px transparent"
            borderRadius="md" p={4} m={4} shadow={'lg'}  >
            <Text fontWeight={'bold'} textTransform={'capitalize'}>Title: {task.title}</Text>
            <Text>Description: {task.description}</Text>
            <Text>Priority: {task.priority}</Text>
            <Text>Due Date: {task.dueDate.toString().slice(0, 10)}</Text>

            <Button onClick={() => { setSelectedTask(task); setIsUpdateTaskFormOpen(true); }}
              mt={2}>Update Task</Button>
            <Button
              colorScheme={task.status === 'Completed' ? 'green' : 'yellow'}
              onClick={() => handleToggleTaskStatus(task)}
              mt={2} ml={2} textTransform={'capitalize'}>{task.status}</Button>

            <Button
              colorScheme="red"
              ml={2}
              onClick={() => handleDeleteTask(task._id)}
              mt={2}>Delete Task</Button>
          </Box>
        ))}

        {/* <Pagination page={page} /> */}
        {selectedTask &&
          <UpdateTaskForm isOpen={isUpdateTaskFormOpen}
            onClose={() => setIsUpdateTaskFormOpen(false)}
            onSubmit={handleUpdateTask}
            task={selectedTask} />}

      </Box> : <Heading as={'h1'} textAlign={'center'} mt={20} w={'40%'} mx={'auto'} color={'navy'} fontWeight={'bold'}>Now you can Create and Manage your task's easily with our Task Manager.</Heading>}
    </Box>
  );
}


export default App;
