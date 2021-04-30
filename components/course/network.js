const express = require('express');

const router = express.Router();
const render = require('./render');

router.get('/:id', render.postDetallesCurso);

module.exports = router;