const mongoose = require('mongoose');

/**
 * ESQUEMA DE MISIÓN (TASK)
 * Define la estructura de las misiones, recompensas y participantes.
 */
const TaskSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: [true, 'Toda misión necesita un nombre'], 
        trim: true 
    },
    descripcion: { 
        type: String, 
        default: 'Sin descripción detallada de la misión.' 
    },
    categoria: { 
        type: String, 
        required: true 
    },
    rango: { 
        type: String, 
        enum: ['S', 'A', 'B', 'C', 'D'], 
        default: 'D' 
    },
    completed: { 
        type: Boolean, 
        default: false 
    },

    // --- SISTEMA DE RECOMPENSAS ---
    recompensas: {
        cobres: { 
            type: Number, 
            default: 0 
        },
        items: [{ 
            type: String 
        }] // Ej: ["Poción de Maná", "Fragmento Astral"]
    },

    // --- REGISTRO DE AVENTUREROS ---
    autorId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true // Necesitamos saber quién publicó la misión
    },
    participantes: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    }]

}, { 
    timestamps: true // Crea automáticamente createdAt y updatedAt
});

module.exports = mongoose.model('Task', TaskSchema);