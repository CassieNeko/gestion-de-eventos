const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../modelos/Usuario'); 

exports.registrarUsuario = async (req, res) => {
  try {
    const { nombre, correo, password } = req.body;

    let usuarioExiste = await Usuario.findOne({ correo });
    if (usuarioExiste) {
      return res.status(400).json({ mensaje: 'El correo ya está registrado' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHasheado = await bcrypt.hash(password, salt);

    const nuevoUsuario = new Usuario({
      nombre,
      correo,
      password: passwordHasheado
    });

    await nuevoUsuario.save();

    const JWT_SECRET = process.env.JWT_SECRET || 'mi_clave_secreta';
    const token = jwt.sign({ id: nuevoUsuario._id }, JWT_SECRET, { expiresIn: '1h' });

    return res.status(201).json({ mensaje: 'Usuario registrado exitosamente', token });
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al registrar usuario', error: error.message });
  }
};

exports.iniciarSesion = async (req, res) => {
  try {
    const { correo, password } = req.body;
    
    let usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(400).json({ mensaje: 'El correo o la contraseña son incorrectos' });
    }

    const esValido = await bcrypt.compare(password, usuario.password);
    if (!esValido) {
      return res.status(400).json({ mensaje: 'El correo o la contraseña son incorrectos' });
    }

    const JWT_SECRET = process.env.JWT_SECRET || 'mi_clave_secreta';
    const token = jwt.sign({ id: usuario._id }, JWT_SECRET, { expiresIn: '1h' });
    
    return res.json({ token });
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error al iniciar sesión', error: error.message });
  }
};
