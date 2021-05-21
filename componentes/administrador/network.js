const express = require('express');
const router = express.Router();
const upload = require('../../middlewares/upload')
const {crearCarpetaCurso} = require('../../middlewares/crearDirectorios')
const render = require('./render');
const dobleInput = upload.fields([{name: 'fotoCurso'}, {name: 'temarioCurso'}])

router.get('/dashboardAdministrador', render.postDashboardAdministrador);
router.get('/administrarCursos', render.postAdministrarCursos);
router.get('/administrarUsuarios', render.postAdministrarUsuarios);
router.get('/consultarCursosEI', render.postConsultarCursoE1);
router.get('/consultarCursosEII', render.postConsultarCursoE2);

/* router.get('/administrarCursos', render.getAdministrarCursos);
router.post('/agregarCurso', crearCarpetaCurso, dobleInput, render.postAgregarCurso); */

module.exports = router;