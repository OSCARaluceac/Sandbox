const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI;

        if (!uri) {
            console.error('❌ ERROR TÁCTICO: No se detectó MONGO_URI en el archivo .env');
            process.exit(1);
        }

        await mongoose.connect(uri);
        console.log('🛰️  Enlace establecido con el búnker de datos (MongoDB)');
    } catch (error) {
        console.error('❌ Fallo crítico en el portal de datos:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;