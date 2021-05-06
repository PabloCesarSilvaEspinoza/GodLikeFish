const express = require('express');

const router = express.Router();
const render = require('./render');

router.get('/', render.getVerCursos);
router.get('/:id', render.getVerCurso);
router.post('/', render.postAgregarCurso);
router.put('/', render.putEditarCurso);

//--------------Examenes---------------------??????????????
router.get('/e', render.getVerExamenes);
router.get('/:id/e', render.getVerExamen);
router.post('/e', render.postAgregarExamen);
router.put('/e', render.putEditarExamen);

//--------------------------------------


module.exports = router;