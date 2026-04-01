const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    categoria: { type: String, required: true },
    rango: { type: String, enum: ['S', 'A', 'B', 'C', 'D'], default: 'D' },
    completed: { type: Boolean, default: false },
    // Recompensas de la misión
    recompensas: {
        cobres: { type: Number, default: 0 },
        items: [{ type: String }] // Ej: ["Poción", "Escudo"]
    },
    // Registro de aventureros
    autorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Quién creó la misión
    participantes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] // Quiénes se unieron
});