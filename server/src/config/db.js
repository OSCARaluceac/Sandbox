const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Portal de MongoDB abierto');
    } catch (error) {
        console.error('❌ Fallo en la conexión:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;