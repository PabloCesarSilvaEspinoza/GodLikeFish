const express = require('express');
const router = express.Router();
const upload = require('../../middlewares/subirArchivosCurso')
const {crearCarpetaCurso} = require('../../middlewares/crearDirectorios')
const render = require('./render');

const dobleInput = upload.fields([{name: 'fotoCurso'}, {name: 'temarioCurso'}])

router.get('/administrarCursos', render.getAdministrarCursos);
router.post('/agregarCurso', crearCarpetaCurso, dobleInput, render.postAgregarCurso);

module.exports = router;