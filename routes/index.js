const express = require('express');
const router = express.Router();

// -------modulos de los controller-------
const inicioController = require('../controllers/inicioController');
const admiController = require('../controllers/admiController');
const pruebaController = require('../controllers/pruebaController');

// -------LIBRO DE RUTAS-------

//vistas del usuario no logeado
router.get('/', inicioController.postPaginaPrincipal);

//vistas del administrador

//vistas del ponente

//vistas del alumno

//vistas de prueba
router.get('/primeraPrueba', pruebaController.postPrimeraPrueba);
router.get('/segundaPrueba', pruebaController.postSegundaPrueba);
router.get('/terceraPrueba', pruebaController.postTerceraPrueba);

module.exports = router;
