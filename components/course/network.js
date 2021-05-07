const express = require('express');

const router = express.Router();
const render = require('./render');

router.get('/', render.getVerCursos);
router.post('/', render.postAgregarCurso);
router.put('/', render.putEditarCurso);

//--------------Examenes---------------------??????????????
router.get('/e', render.getVerExamenes);
router.get('/:id/e', render.getVerExamen);
router.post('/e', render.postAgregarExamen);
router.put('/e', render.putEditarExamen);

//--------------------------------------

router.get('/administrarCursos', render.postAdministrarCursos);
router.get('/:id', render.getVerCurso);

module.exports = router;