const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    categoria: { type: String, required: true },
    rango: { type: String, required: true, enum: ['S', 'A', 'B', 'C', 'D'] },
    completed: { type: Number, default: 0 }, // 0: Pendiente, 1: Lograda
    autorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    participantes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    recompensas: {
        cobres: { type: Number, default: 0 },
        items: [{ type: String }]
    }
}, { timestamps: true });

module.exports = mongoose.model('Task', TaskSchema);