/**
 * TASK ROUTES - Mapa de Acceso del Gremio
 * Define los puntos de entrada legales para las operaciones de misiones.
 */
const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');

// [GET] Obtener listado de misiones
router.get('/', taskController.getTasks);

// [POST] Publicar un nuevo contrato
router.post('/', taskController.createTask);

// [PATCH] Actualizar estado de una misión (Completar/Reabrir)
// Es vital que el ID sea dinámico (:id) para localizar el objetivo
router.patch('/:id', taskController.updateTaskStatus);

// [DELETE] Eliminar registro permanentemente
router.delete('/:id', taskController.deleteTask);

module.exports = router;