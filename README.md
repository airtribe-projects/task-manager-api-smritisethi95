# Task Manager API

A RESTful API for managing tasks built with Node.js and Express.

## Features

- Create, read, update, and delete tasks
- Input validation and error handling
- Persistent data storage using JSON file
- Comprehensive test coverage

## Prerequisites

- Node.js >= 18.0.0
- npm

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd airtribe-engineering-learners-task-manager-api-task-manager
```

2. Install dependencies:
```bash
npm install
```

## Usage

### Start the server:
```bash
npm start
```
The server will run on `http://localhost:3000`

### Run tests:
```bash
npm test
```

## API Endpoints

### Get all tasks
```http
GET /tasks
```
**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "title": "Set up environment",
    "description": "Install Node.js, npm, and git",
    "completed": true
  }
]
```

### Get a specific task
```http
GET /tasks/:id
```
**Response:** `200 OK`
```json
{
  "id": 1,
  "title": "Set up environment",
  "description": "Install Node.js, npm, and git",
  "completed": true
}
```
**Error:** `404 Not Found` if task doesn't exist

### Create a new task
```http
POST /tasks
```
**Request Body:**
```json
{
  "title": "New Task",
  "description": "Task description",
  "completed": false
}
```
**Response:** `201 Created`
```json
{
  "id": 2,
  "title": "New Task",
  "description": "Task description",
  "completed": false
}
```
**Error:** `400 Bad Request` if title or description is missing

### Update a task
```http
PUT /tasks/:id
```
**Request Body:**
```json
{
  "title": "Updated Task",
  "description": "Updated description",
  "completed": true
}
```
**Response:** `200 OK`
```json
{
  "id": 1,
  "title": "Updated Task",
  "description": "Updated description",
  "completed": true
}
```
**Errors:**
- `404 Not Found` if task doesn't exist
- `400 Bad Request` if completed is not a boolean

### Delete a task
```http
DELETE /tasks/:id
```
**Response:** `200 OK`
```json
{
  "message": "Task deleted successfully"
}
```
**Error:** `404 Not Found` if task doesn't exist

## Project Structure

```
.
├── app.js              # Express application and routes
├── task.json           # Task data storage
├── package.json        # Project dependencies and scripts
├── test/
│   └── server.test.js  # API tests
└── README.md           # Project documentation
```

## Technologies Used

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **Tap** - Testing framework
- **Supertest** - HTTP assertions

## License

ISC

## Author

Airtribe
