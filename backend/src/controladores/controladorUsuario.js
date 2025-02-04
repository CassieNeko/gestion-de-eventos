const Usuario = require('../modelos/Usuario'); 

const obtenerPerfilUsuario = async (req, res) => {
  try {
    console.log(req.user);
    const usuario = await Usuario.findById(req.user.id).select('-password');
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    return res.status(200).json({ usuario });
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al obtener el perfil del usuario', error: error.message });
  }
};

const actualizarPerfilUsuario = async (req, res) => {
  try {
    console.log(req.user); 
    const { nombre, correo } = req.body;
    const usuario = await Usuario.findById(req.user.id);
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    usuario.nombre = nombre || usuario.nombre;
    usuario.correo = correo || usuario.correo;
    const usuarioActualizado = await usuario.save();
    return res.status(200).json({ mensaje: 'Perfil actualizado', usuario: usuarioActualizado });
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al actualizar el perfil', error: error.message });
  }
};

module.exports = {
  obtenerPerfilUsuario,
  actualizarPerfilUsuario
};
