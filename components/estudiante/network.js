
const express = require('express');
const router = express.Router();
const render = require('./render');

router.get('/', render.getVerTareas);
// router.get('/:id', render.getVerTarea);
// router.post('/', render.postAgregarTarea);
// router.put('/', render.putEditarTarea);

module.exports = router;