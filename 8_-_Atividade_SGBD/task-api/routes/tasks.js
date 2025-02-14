const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Criar uma nova tarefa
router.post('/', async (req, res) => {
    const task = new Task({
        name: req.body.name,
        description: req.body.description
    });

    try {
        const savedTask = await task.save();
        res.status(201).send(savedTask);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Listar todas as tarefas
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).send(tasks);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Excluir uma tarefa
router.delete('/:id', async (req, res) => {
    try {
        const removedTask = await Task.deleteOne({ _id: req.params.id });
        res.status(200).send(removedTask);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;