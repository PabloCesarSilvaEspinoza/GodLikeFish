const express = require('express');

const router = express.Router();
const render = require('./render');

router.get('/', render.getVerCursos);
router.post('/', render.postAgregarCurso);
router.put('/', render.putEditarCurso);
router.get('/administrarCursos', render.postAdministrarCursos);
router.get('/:id', render.getVerCurso);

module.exports = router;