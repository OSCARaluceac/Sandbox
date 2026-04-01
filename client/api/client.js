/**
 * API CLIENT - TASKFLOW (Rango S)
 * Gestiona la comunicación asíncrona con el servidor de Node.js.
 */

// Detección inteligente de punto de enlace
const API_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:3000/api/v1/tasks' 
    : '/api/v1/tasks';

export const taskAPI = {
    /**
     * Sincroniza todas las misiones registradas.
     */
    async getAll() {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Error al sincronizar con el servidor.');
        return await response.json();
    },

    /**
     * Registra una nueva misión con su botín en el servidor central.
     */
    async create(title, categoria, rango, cobres = 0, items = []) {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                title, 
                categoria, 
                rango,
                recompensas: { cobres, items }
            })
        });
        if (!response.ok) throw new Error('No se pudo guardar la misión en el servidor.');
        return await response.json();
    },

    /**
     * Actualiza el estado de cumplimiento de una misión.
     */
    async updateStatus(id, completed) {
        const response = await fetch(`${API_URL}/${id}`, { 
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ completed })
        });
        if (!response.ok) throw new Error('Error al actualizar el estado.');
        return await response.json();
    },

    /**
     * Modifica los metadatos completos de una misión (Edición).
     */
    async update(id, data) {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Error al modificar los parámetros del encargo.');
        return await response.json();
    },

    /**
     * Recluta al usuario activo para un encargo específico.
     */
    async join(id) {
        // Enviaremos una señal POST a la ruta de participación
        const response = await fetch(`${API_URL}/${id}/join`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) throw new Error('Interferencia al intentar unirse a la misión.');
        return await response.json();
    },

    /**
     * Elimina permanentemente una misión del registro.
     */
    async delete(id) {
        const response = await fetch(`${API_URL}/${id}`, { 
            method: 'DELETE' 
        });
        if (!response.ok) throw new Error('Error al eliminar el registro del servidor.');
        return true;
    }
};