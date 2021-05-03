const express = require('express');

const router = express.Router();
const render = require('./render');

router.get('/', render.getVerCursos);
router.get('/:id', render.getVerCurso);
router.post('/', render.postAgregarCurso);
router.put('/', render.putEditarCurso)


module.exports = router;