require('dotenv').config();
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const conectarBDMongo = require('./src/configuracion/baseDatos');
const rutasEventos = require('./src/rutas/rutasEventos');
const rutasUsuario = require('./src/rutas/rutasUsuario');
const rutasAutenticacion = require('./src/rutas/rutasAutenticacion');
const middlewareAutenticacion = require('./src/middleware/middlewareAutenticacion');

dotenv.config();

app.use(bodyParser.json()); 
app.use(express.json()); 
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(express.static('public'));

conectarBDMongo();

app.use('/api/eventos', rutasEventos); 
app.use('/api/autenticacion', rutasAutenticacion); 
app.use('/api/usuarios', rutasUsuario); 

app.get('/api/usuarios/perfil', middlewareAutenticacion, (req, res) => {
  res.status(200).json({ mensaje: 'Perfil de usuario', usuario: req.user });
});

app.use((req, res) => res.status(404).json({ mensaje: 'Ruta no encontrada' }));
app.use((error, req, res) => {
  console.error(error.stack);
  res.status(500).json({ mensaje: 'Error en el servidor', error: error.message });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor ejecutándose en el puerto ${PORT}`));
