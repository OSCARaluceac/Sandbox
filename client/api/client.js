/**
 * API CLIENT - TASKFLOW (Rango S) - Versión Corregida
 * Protocolo de comunicación síncrona con el núcleo de MongoDB.
 */

const API_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:3000/api/v1/tasks' 
    : '/api/v1/tasks';

export const taskAPI = {
    /**
     * Sincroniza todas las misiones. 
     * Nota: En el frontend, recuerda usar task._id para las claves.
     */
    async getAll() {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Error de sincronización.');
        return await response.json();
    },

    /**
     * Registra misión vinculada a un autor (ID de tu amigo).
     */
    async create(title, categoria, rango, autorId, cobres = 0, items = []) {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                title, 
                categoria, 
                rango,
                autorId, // Obligatorio según tu esquema
                recompensas: { cobres, items }
            })
        });
        if (!response.ok) throw new Error('Fallo al registrar misión.');
        return await response.json();
    },

    /**
     * Actualiza estado y procesa pago de cobres al usuario.
     */
    async updateStatus(taskId, userId, completed) {
        const response = await fetch(`${API_URL}/${taskId}/status`, { 
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, completed }) // Enviamos userId para la recompensa
        });
        if (!response.ok) throw new Error('Error al procesar cumplimiento.');
        return await response.json();
    },

    /**
     * Une a un amigo a la lista de participantes.
     */
    async join(taskId, userId) {
        const response = await fetch(`${API_URL}/${taskId}/join`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId }) // Identifica quién se une
        });
        if (!response.ok) throw new Error('Fallo al reclutar aventurero.');
        return await response.json();
    },

    /**
     * Modificación integral de parámetros.
     */
    async update(taskId, data) {
        const response = await fetch(`${API_URL}/${taskId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Error al modificar parámetros.');
        return await response.json();
    },

    /**
     * Eliminación del registro por ID de MongoDB (_id).
     */
    async delete(taskId) {
        const response = await fetch(`${API_URL}/${taskId}`, { 
            method: 'DELETE' 
        });
        if (!response.ok) throw new Error('Error al eliminar registro.');
        return true;
    }
};