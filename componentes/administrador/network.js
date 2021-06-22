const express = require('express');
const router = express.Router();
const upload = require('../../middlewares/subirArchivosCurso')
const {crearCarpetaCurso} = require('../../middlewares/crearDirectorios')
const render = require('./render');
const dobleInput = upload.fields([{name: 'fotoCurso'}, {name: 'temarioCurso'}])

router.get('/dashboardAdministrador', render.getDashboardAdministrador);
router.get('/administrarCursos', render.getAdministrarCursos);
router.get('/administrarUsuarios', render.getAdministrarUsuarios);
router.get('/curso/:idCurso', render.getConsultarCurso);
router.post('/agregarCurso', crearCarpetaCurso, dobleInput, render.postAgregarCurso);
router.get('/editarUsuarios/:id', render.getEditarUsuario);
router.post('/editarUsuarios/:id', render.postEditarUsuario);

router.get('/DescargarTarjetonUsuario/:idUsuario/:nombreTarjeton', render.getDescargarTarjetonUsuario);
router.post('/ResolverProblema/:tipoProblema', render.postResolverProblema);
router.post('/VerificarTarjetonUsuario', render.postVerificarTarjetonUsuario);

module.exports = router;