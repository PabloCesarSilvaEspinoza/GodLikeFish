const express = require('express');
const router = express.Router();

// -------modulos de los controller-------
const inicioController = require('../controllers/generalController');
const admiController = require('../controllers/admiController');

const pruebaController = require('../controllers/pruebaController');

// -------LIBRO DE RUTAS-------

//vistas del usuario no logeado
router.get('/', inicioController.postPaginaPrincipal);
router.get('/inicio', inicioController.postInicio);
router.get('/confirmarCorreo', inicioController.postConfirmarCorreo);
router.get('/registrar', inicioController.postRegistrar);

//vistas del administrador
router.get('/tarjetasponente', admiController.postTarjetasPonentes);
router.get('/editarponente', admiController.postEditarPonente);
router.get('/ejemplo', admiController.postEjemplo);

//vistas del ponente



//vistas de prueba
router.get('/primeraPrueba', pruebaController.postPrimeraPrueba);
router.get('/segundaPrueba', pruebaController.postSegundaPrueba);
router.get('/terceraPrueba', pruebaController.postTerceraPrueba);

module.exports = router;
