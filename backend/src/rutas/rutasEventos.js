const express = require('express');
const router = express.Router();
const { obtenerEventos, crearEvento, actualizarEvento, eliminarEvento, buscarEventos } = require('../controladores/controladorEventos');
const middlewareAutenticacion = require('../middleware/middlewareAutenticacion');

router.post('/', middlewareAutenticacion, crearEvento); 

router.get('/', middlewareAutenticacion, obtenerEventos);

router.get('/search', middlewareAutenticacion, buscarEventos);

router.put('/:id', middlewareAutenticacion, actualizarEvento);

router.delete('/:id', middlewareAutenticacion, eliminarEvento);

module.exports = router;
