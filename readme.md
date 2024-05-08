# Task Manager

## Inroduction
Welcome to Task Manager! Task Manager is a simple yet powerful application designed to help you organize your tasks efficiently. Whether you're a student, a professional, or anyone in need of managing tasks, Task Manager has got you covered.


## Features

- Task Creation: Easily create tasks with titles, descriptions, stauts, due dates, and priority levels.
- Task Update: Modify task details such as title, description, status, due date, and priority.
- Task Delete: Remove tasks that are no longer needed or relevant.
- Get All Own Created Tasks: View a list of tasks created by you for better organization and tracking.
- Get Tasks Assigned to You: - Access tasks assigned to you by other users to stay informed and manage your workload effectively.
- Assign Task to Another User: Delegate tasks to other users by assigning them to specific individuals.
- Change Task Status: Update the status of tasks assigned to you to reflect your progress or completion.
- Authentication Sign Up and Sign In: Securely sign up for a new account or log in to your existing account to access Task Manager's features.

## API Reference

#### Authentication

- Login 
  - Method: POST
  - Route: `/users/login`
  - Description: Authenticate a user and generate a token.

- Register
   - Method: POST 
  - Route: `/users/register`
  - Description: Register a new account.

### Task Management

- Create Task
  - Method: POST
  - Route: `/tasks`
  - Description: Create a new task.
  - Request Body: 
  ```bash 
  {
    "title": "Task Title",
    "description": "Task Description",
    "dueDate": "2024-05-15",
    "priority": "High",
    "status": "Pending"
  }

- Update Task
  - Method: PUT
  - Route: `/tasks/:id`
  - Description: Update an existing task by its ID.
  - Request Body: 
  ```bash 
  {
    "title": "Task Title",
    "description": "Task Description",
    "dueDate": "2024-05-25",
    "priority": "Medium",
    "status": "Pending"
  }  

- Delete Task 
  - Method: DELETE
  - Route: `/tasks/:id`
  - Description: Delete task by its ID.

- Get Tasks 
  - Method: GET
  - Route: `/tasks`
  - Description: Retrive all tasks.


### Task Assignment

- Assign Task 
  - Method: PATCH
  - Route: /assign/:id
  - Description: Assign a task to another user by task ID
  - Request Body: 
  ```bash 
  {
    "assigneeId":"UserId" 
  }
  ```
- Get Assigned Tasks
  - Method: GET
  - Route: `/assigned-tasks`
  - Description: Retrieve tasks assigned to the authenticated user.  

- Update Assigned Task Status
  - Method: PATCH
  - Route: `/assigned-status/:id`
  - Description: Update the status of an assigned task by its ID.
Request Body:
```bash 
{
  "assignee_status": "updated value" 
}
```
## Installation

Install my-project with npm

```bash
  npm install https://github.com/MitreshPrajapati/pabbly-assignment/tree/main
```

## Authors

- [@MitreshPrajapati](https://github.com/MitreshPrajapati)
