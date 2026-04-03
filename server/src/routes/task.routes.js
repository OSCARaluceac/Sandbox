const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');

router.get('/', taskController.getTasks);
router.post('/', taskController.createTask);

// Ruta específica para actualizar estado y procesar cobres
router.patch('/:id/status', taskController.updateTaskStatus);

// Nueva ruta para que los amigos se unan al equipo
router.post('/:id/join', taskController.joinTask);

router.delete('/:id', taskController.deleteTask);

module.exports = router;