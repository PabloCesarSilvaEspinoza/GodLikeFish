const express = require('express');
const router = express.Router();
const upload = require('../../callbacks/upload')
const {crearCarpetaCurso} = require('../../callbacks/createDirectory')
const render = require('./render');

const doubleInput = upload.fields([{name: 'fotoCurso'}, {name: 'temarioCurso'}])

router.get('/administrarCursos', render.getAdministrarCursos);
router.post('/agregarCurso', crearCarpetaCurso, doubleInput, render.postAgregarCurso);

module.exports = router;