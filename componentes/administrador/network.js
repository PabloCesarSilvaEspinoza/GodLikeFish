const express = require('express');
const router = express.Router();
const upload = require('../../middlewares/subirArchivosCurso')
const {crearCarpetaCurso} = require('../../middlewares/crearDirectorios')
const render = require('./render');
const dobleInput = upload.fields([{name: 'fotoCurso'}, {name: 'temarioCurso'}])

router.get('/dashboardAdministrador', render.getDashboardAdministrador);
router.get('/administrarCursos', render.getAdministrarCursos);

router.get('/administrarUsuarios', render.getAdministrarUsuarios);


router.get('/consultarCursosEI', render.getConsultarCursoE1);
router.get('/consultarCursosEII', render.getConsultarCursoE2);

router.post('/agregarCurso', crearCarpetaCurso, dobleInput, render.postAgregarCurso);

module.exports = router;