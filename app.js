const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());

const TASKS_FILE = './task.json';

let tasks = [];
let nextId = 0;

function loadTasks() {
    try {
        const data = fs.readFileSync(TASKS_FILE, 'utf-8');
        let parsed = JSON.parse(data);
        tasks = parsed.tasks || [];
        nextId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) : 0;
    } catch (error) {
        console.log('Error loading tasks:', error.message);
        tasks = [];
        nextId = 0;
    }
}

function saveTasks() {
    try {
        fs.writeFileSync(TASKS_FILE, JSON.stringify({ tasks }, null, 2));
    } catch (error) {
        console.error('Error saving tasks:', error.message);
        throw new Error('Failed to save tasks');
    }
}

loadTasks();

app.get('/tasks', (req, res) => {
    res.json(tasks);
})

app.get('/tasks/:id', (req, res) => {
    const id = Number(req.params.id);
    const task = tasks.find(t => t.id === id);

    if (!task) {
        return res.status(404).json({ error: "Task not Found!" });
    }
    res.json(task);
})

app.post('/tasks', (req, res) => {
    const { title, description, completed = false } = req.body;
    
    // Validate required fields
    if (!title || !description) {
        return res.status(400).json({ error: "Title and description are required" });
    }
    
    const newTask = { 
        id: ++nextId, 
        title, 
        description, 
        completed 
    };
    tasks.push(newTask);
    saveTasks();
    res.status(201).json(newTask);
});

app.put('/tasks/:id', (req, res) => {
    const taskId = Number(req.params.id);
    const index = tasks.findIndex(t => t.id === taskId);
    
    if (index === -1) {
        return res.status(404).json({ error: "Task not found" });
    }
    
    const { title, description, completed } = req.body;
    
    // Validate completed is boolean if provided
    if (completed !== undefined && typeof completed !== 'boolean') {
        return res.status(400).json({ error: "Completed must be a boolean" });
    }
    
    const updatedTask = { 
        ...tasks[index],
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(completed !== undefined && { completed })
    };
    
    tasks[index] = updatedTask;
    saveTasks();
    res.json(updatedTask);
})

app.delete('/tasks/:id', (req, res) => {
    const taskId = Number(req.params.id);
    const index = tasks.findIndex(t => t.id === taskId);
    
    if (index === -1) {
        return res.status(404).json({ error: "Task not found" });
    }
    
    tasks.splice(index, 1);
    saveTasks();
    res.json({ message: `Task deleted successfully` });
})

// Only start server if this file is run directly (not imported for testing)
if (require.main === module) {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}

module.exports = app;