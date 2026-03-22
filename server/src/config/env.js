require('dotenv').config();

const config = {
    port: process.env.PORT || 3000
};

// Protocolo de validación: 
// Si por algún motivo el puerto no está definido, el sistema lanzará una alerta.
if (!process.env.PORT) {
    console.warn("[ADVERTENCIA]: El puerto no está definido en el .env, usando 3000 por defecto.");
}

module.exports = config;