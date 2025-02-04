const mongoose = require('mongoose');

const conectarBDMongo = async () => {
    try {
        const uri = process.env.MONGO_URI; 
        if (!uri) {
            throw new Error('La URI de MongoDB no está definida en el archivo .env');
        }
        await mongoose.connect(uri);
        console.log('Conexión a MongoDB exitosa');
    } catch (error) {
        console.error('Error al conectar a MongoDB', error);
        process.exit(1); 
    }
};

module.exports = conectarBDMongo;
