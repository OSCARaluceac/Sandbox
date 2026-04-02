const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    rango: { type: String, default: 'D' },
    cobres: { type: Number, default: 0 },
    inventario: [{ type: String }] // Array de strings para tus ítems
});

module.exports = mongoose.model('User', UserSchema);