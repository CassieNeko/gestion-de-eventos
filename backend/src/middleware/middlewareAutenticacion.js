const jwt = require('jsonwebtoken');

const middlewareAutenticacion = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  
  console.log(authHeader); 

  if (!authHeader) {
    return res.status(403).json({ mensaje: 'No se proporcionó un token' });
  }

  if (!authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ mensaje: 'Acceso denegado. Token no proporcionado o incorrecto.' });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ mensaje: 'Token inválido o expirado.' });
    }

    console.log(decoded); 
    req.userId = decoded.id; 
    console.log(req.userId); 
    next();
  });
};

module.exports = middlewareAutenticacion;
