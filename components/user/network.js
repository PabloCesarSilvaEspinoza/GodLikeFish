const express = require('express');
const render = require('./render');

const router = express.Router();

// Routes
router.get('/', render.getVerUsuarios)
router.get('/registrar', render.getRegistrar);

router.get('/:id', render.getVerUsuario);
router.post('/', render.postAgregarUsuario);
router.put('/', render.putEditarUsuario)

module.exports = router;