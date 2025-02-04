const express = require('express');
const router = express.Router();
const controladorAutenticacion = require('../controladores/controladorAutenticacion');

router.post('/registro', controladorAutenticacion.registrarUsuario);

router.post('/login', controladorAutenticacion.iniciarSesion);

module.exports = router;
