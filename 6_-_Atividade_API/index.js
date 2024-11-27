const express = require('express');
const app = express();
const port = 3000;

// Array em memória para armazenar as tarefas
let tasks = [];

app.use(express.json());

// GET para /tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// POST para /tasks
app.post('/tasks', (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description are required' });
  }
  
  const newTask = {
    id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
    title,
    description,
    completed: false,
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT para /tasks/:id
app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;
  const taskIndex = tasks.findIndex(task => task.id === parseInt(id));
  
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }
  
  const task = tasks[taskIndex];
  tasks[taskIndex] = { ...task, title, description, completed };
  res.json(tasks[taskIndex]);
});

// DELETE para /tasks/:id
app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  tasks = tasks.filter(task => task.id !== parseInt(id));
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
