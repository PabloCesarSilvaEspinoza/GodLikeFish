const express = require('express');

const router = express.Router();
const render = require('./render');

router.get('/', render.getVerCursos);
router.post('/', render.postAgregarCurso);
router.put('/', render.putEditarCurso);

//--------------Examenes---------------------??????????????
router.get('examen/', render.getVerExamenes);
router.get('examen/:id', render.getVerExamen);
router.post('examen/', render.postAgregarExamen);
router.put('examen/', render.putEditarExamen);

//--------------------------------------

router.get('/administrarCursos', render.postAdministrarCursos);
router.get('/:id', render.getVerCurso);

module.exports = router;