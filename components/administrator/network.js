const express = require('express');
const router = express.Router();
const upload = require('../../upload/upload')
const render = require('./render');

const doubleInput = upload.fields([{name: 'fotoCurso'}, {name: 'temarioCurso'}])

router.get('/administrarCursos', render.getAdministrarCursos);
router.post('/agregarCurso', doubleInput, render.postAgregarCurso);

module.exports = router;