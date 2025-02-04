const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UsuarioSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    correo: { 
        type: String, required: true, unique: true, 
        match: [/^\S+@\S+\.\S+$/, 'Por favor, ingresa un correo válido'] 
    },
    password: { type: String, required: true },
    fechaRegistro: { type: Date, default: Date.now },
});

UsuarioSchema.methods.compararPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('Usuario', UsuarioSchema);
