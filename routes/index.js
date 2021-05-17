const express = require('express');
const router = express.Router();

// -------modulos de los controller-------
const inicioController = require('../controllers/generalController');
const admiController = require('../controllers/admiController');
const pruebaController = require('../controllers/pruebaController');

// -------LIBRO DE RUTAS-------

//vistas del usuario no logeado
//movidas al auth

//vistas del administrador
router.get('/ejemplo', admiController.postEjemplo);
router.get('/PrincipalAdministrador-Ponentes', admiController.postAdministradorPonentes);
router.get('/dashboard', admiController.postDashboard);

//vistas del ponente


//vistas de prueba
router.get('/primeraPrueba', pruebaController.postPrimeraPrueba);
router.get('/segundaPrueba', pruebaController.postSegundaPrueba);
router.get('/terceraPrueba', pruebaController.postTerceraPrueba);

module.exports = router;
