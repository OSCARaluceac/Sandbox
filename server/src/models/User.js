const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // Estadísticas del Gremio
    rango: { type: String, default: 'D' }, // D, C, B, A, S
    cobres: { type: Number, default: 100 }, // Empezar con algo de dinero
    inventario: { type: Array, default: [] }, // ['Poción de salud', 'Daga de hierro']
    avatar: { type: String, default: 'https://api.dicebear.com/7.x/avataaars/svg' } // Un avatar aleatorio
});

module.exports = mongoose.model('User', UserSchema);