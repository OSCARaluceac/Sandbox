const Task = require('../models/Task');
const User = require('../models/User');

/**
 * Obtiene todos los contratos del tablón.
 */
const getAll = async () => {
    return await Task.find().sort({ createdAt: -1 });
};

/**
 * Registra un nuevo contrato en MongoDB.
 */
const create = async (taskData) => {
    const newTask = new Task(taskData);
    return await newTask.save();
};

/**
 * Lógica Crítica: Actualiza el estado y transfiere el botín al aventurero.
 */
const updateStatus = async (taskId, userId, completed) => {
    // 1. Localizamos la misión
    const task = await Task.findById(taskId);
    if (!task) throw new Error('NOT_FOUND');

    // 2. Si se marca como completada y antes no lo estaba, procesamos la recompensa
    if (completed && !task.completed) {
        const reward = task.recompensas?.cobres || 0;
        const items = task.recompensas?.items || [];

        // Inyectamos cobres e ítems en el perfil de Niko/Amigo
        await User.findByIdAndUpdate(userId, {
            $inc: { cobres: reward },
            $push: { inventario: { $each: items } }
        });
    }

    // 3. Guardamos el nuevo estado de la misión
    task.completed = completed;
    return await task.save();
};

/**
 * Registra a un aventurero en la lista de participantes.
 */
const join = async (taskId, userId) => {
    const task = await Task.findByIdAndUpdate(
        taskId,
        { $addToSet: { participantes: userId } }, // $addToSet evita duplicados
        { new: true }
    );
    if (!task) throw new Error('NOT_FOUND');
    return task;
};

/**
 * Eliminación definitiva del registro.
 */
const remove = async (id) => {
    const result = await Task.findByIdAndDelete(id);
    if (!result) throw new Error('NOT_FOUND');
    return true;
};

module.exports = { getAll, create, updateStatus, join, remove };