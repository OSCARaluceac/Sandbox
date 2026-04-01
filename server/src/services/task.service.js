/**
 * TASK SERVICE - Evolución MongoDB
 * La persistencia ahora es externa y asíncrona.
 */
const Task = require('../models/Task'); // Importamos el modelo

const getAll = async () => {
    // Buscamos todos los registros en el búnker de MongoDB
    return await Task.find().sort({ createdAt: -1 });
};

const create = async (taskData) => {
    // Creamos una nueva instancia basada en el esquema
    const newTask = new Task(taskData);
    return await newTask.save();
};

const updateStatus = async (id, completed) => {
    // Buscamos por el ID de MongoDB y actualizamos solo el campo necesario
    const task = await Task.findByIdAndUpdate(
        id, 
        { completed, updatedAt: new Date() }, 
        { new: true } // Esto devuelve la misión ya actualizada
    );
    
    if (!task) throw new Error('NOT_FOUND');
    return task;
};

const remove = async (id) => {
    // Eliminación definitiva del registro
    const result = await Task.findByIdAndDelete(id);
    if (!result) throw new Error('NOT_FOUND');
    return true;
};

const getAllByUser = async (userId) => {
    return await Task.find({ userId }).sort({ createdAt: -1 });
};

module.exports = { getAll, create, updateStatus, remove };