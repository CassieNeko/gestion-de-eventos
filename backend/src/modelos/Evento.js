const mongoose = require('mongoose');

const EventoSchema = new mongoose.Schema({
  evento: { type: String, required: true },
  fecha: { type: Date, required: true },
  hora: { type: String, required: true },
  ubicacion: { type: String, required: true },
  descripcion: { type: String },
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true }
});

const Event = mongoose.model('Event', EventoSchema);

module.exports = Event;
