const express = require('express');

const router = express.Router();
const render = require('./render');

router.get('/', render.getVerCursos);
router.get('/:id', render.getVerCurso);
router.post('/', render.postAgregarCurso);
router.put('/', render.putEditarCurso);

//--------------Examenes---------------------??????????????
router.get('examen/', render.getVerExamenes);
router.get('examen/:id', render.getVerExamen);
router.post('examen/', render.postAgregarExamen);
router.put('examen/', render.putEditarExamen);

//--------------------------------------


module.exports = router;