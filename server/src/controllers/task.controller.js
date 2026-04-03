const taskService = require('../services/task.service');

const getTasks = async (req, res) => {
    const tasks = await taskService.getAll();
    res.status(200).json(tasks);
};

const createTask = async (req, res) => {
    const { title, categoria, rango, autorId, recompensas } = req.body;

    // Validación táctica
    if (!title || !autorId) {
        return res.status(400).json({ error: "Datos insuficientes para publicar el contrato." });
    }

    try {
        const newTask = await taskService.create({ 
            title, categoria, rango, autorId, recompensas 
        });
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ error: "Error al crear la misión en la base de datos." });
    }
};

const updateTaskStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId, completed } = req.body; // Recibimos quién la completa para pagarle

        const updatedTask = await taskService.updateStatus(id, userId, completed);
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ error: "Fallo al actualizar estado o repartir botín." });
    }
};

const joinTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const task = await taskService.join(id, userId);
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ error: "No se pudo unir al equipo de la misión." });
    }
};

const deleteTask = async (req, res) => {
    try {
        await taskService.remove(req.params.id);
        res.status(204).send(); 
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar el registro." });
    }
};

module.exports = { getTasks, createTask, updateTaskStatus, joinTask, deleteTask };