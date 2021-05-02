const express = require('express');

const router = express.Router();
const render = require('./render');

router.get('/', render.getCursos);
router.get('/:id', render.postDetallesCurso);
router.post('/', render.postAgregarCurso);
router.put('/', render.putEditarCurso)


module.exports = router;