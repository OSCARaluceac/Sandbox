// server/src/controllers/task.controller.js
const taskService = require('../services/task.service');

const getTasks = (req, res) => {
    const tasks = taskService.getAll();
    res.status(200).json(tasks);
};

const createTask = (req, res) => {
    const { title, priority } = req.body;

    // Validación defensiva estricta
    if (!title || typeof title !== 'string' || title.trim().length < 3) {
        return res.status(400).json({ error: "El título es obligatorio y debe tener al menos 3 caracteres." });
    }

    const newTask = taskService.create({ title, priority: priority || 1 });
    res.status(201).json(newTask);
};

const deleteTask = (req, res) => {
    try {
        const { id } = req.params;
        taskService.remove(id);
        res.status(204).send(); // 204 significa "Éxito, pero no hay nada que devolver"
    } catch (error) {
        if (error.message === 'NOT_FOUND') {
            return res.status(404).json({ error: "La tarea que intentas eliminar no existe." });
        }
        res.status(500).json({ error: "Error interno del servidor." });
    }
};

module.exports = { getTasks, createTask, deleteTask };