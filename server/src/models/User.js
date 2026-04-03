const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    rango: { type: String, enum: ['S', 'A', 'B', 'C', 'D'], default: 'D' },
    cobres: { type: Number, default: 0 },
    inventario: [{ type: String }],
    avatar: { type: String, default: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Niko' }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);