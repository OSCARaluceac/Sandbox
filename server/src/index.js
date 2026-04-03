// server/src/index.js
require('dotenv').config(); // 🛡️ Protocolo de carga de variables secretas
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db'); // Portal a MongoDB
const taskRoutes = require('./routes/task.routes');
const userRoutes = require('./routes/user.routes'); // Registro de Aventureros

const app = express();

// 1. Conexión al Núcleo de Datos
connectDB(); 

// --- Middlewares Globales ---
app.use(cors());
app.use(express.json());

// Middleware de Auditoría (Logger de Rendimiento)
app.use((req, res, next) => {
  const inicio = performance.now();
  res.on('finish', () => { 
    const duracion = performance.now() - inicio;
    console.log(`[${req.method}] ${req.originalUrl} - Estado: ${res.statusCode} (${duracion.toFixed(2)}ms)`);
  });
  next();
});

// --- Rutas del Gremio ---
app.use('/api/v1/tasks', taskRoutes);
app.use('/api/v1/users', userRoutes); // Vital para cargar tu Rango y Cobres

// --- Manejo Global de Errores ---
app.use((err, req, res, next) => {
  console.error(`[ERROR]: ${err.message}`);

  if (err.message === 'NOT_FOUND') {
    return res.status(404).json({ error: "Recurso no encontrado, Niko." });
  }

  res.status(500).json({ 
    error: "Error interno del servidor. Protocolo de emergencia activo." 
  });
});

// Definición del puerto (Prioriza .env)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`[SISTEMA]: Gremio operativo en el puerto ${PORT}`);
});