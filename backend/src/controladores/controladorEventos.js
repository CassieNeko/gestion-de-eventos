const Event = require('../modelos/Evento');
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No se proporcionó token de autorización' });
  }
  jwt.verify(token, process.env.JWT_SECRET || 'clave_secreta_para_jwt', (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token no válido' });
    }
    console.log(decoded); 
    req.userId = decoded.id; 
    next();
  });
};

const crearEvento = async (req, res) => {
  try {
    const usuarioId = req.userId; 
    console.log(usuarioId); 
    const nuevoEvento = await Event.create({ ...req.body, usuarioId }); 
    res.status(201).json(nuevoEvento);
  } catch (err) {
    res.status(400).json({ message: 'Error al agregar evento', error: err.message });
  }
};

const obtenerEventos = async (req, res) => {
  try {
    const { fecha, ubicacion, search } = req.query;
    const usuarioId = req.userId; 
    const filtro = { usuarioId, ...(fecha && { fecha }), ...(ubicacion && { ubicacion }) };

    if (search) {
      filtro.nombre = { $regex: search, $options: 'i' };
    }

    const eventos = await Event.find(filtro);

    if (eventos.length === 0) {
      return res.status(404).json({ message: 'No se encontraron eventos' });
    }

    res.json(eventos);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener eventos', error: err.message });
  }
};

const buscarEventos = async (req, res) => {
  try {
    const { search } = req.query;
    const usuarioId = req.userId; 
    const eventos = await Event.find({ 
      nombre: { $regex: search, $options: 'i' },
      usuarioId 
    });

    if (eventos.length === 0) {
      return res.status(404).json({ message: 'No se encontraron eventos' });
    }

    res.json(eventos);
  } catch (err) {
    res.status(500).json({ message: 'Error al buscar eventos', error: err.message });
  }
};

const actualizarEvento = async (req, res) => {
  try {
    const eventoActualizado = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!eventoActualizado) {
      return res.status(404).json({ message: 'Evento no encontrado' });
    }

    res.json(eventoActualizado);
  } catch (err) {
    res.status(400).json({ message: 'Error al actualizar evento', error: err.message });
  }
};

const eliminarEvento = async (req, res) => {
  try {
    const eventoEliminado = await Event.findByIdAndDelete(req.params.id);

    if (!eventoEliminado) {
      return res.status(404).json({ message: 'Evento no encontrado' });
    }

    res.json({ message: 'Evento eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar evento', error: err.message });
  }
};

module.exports = { crearEvento, obtenerEventos, buscarEventos, actualizarEvento, eliminarEvento, verifyToken };
