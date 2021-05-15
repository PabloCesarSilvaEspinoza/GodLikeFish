const express = require('express');
const secure = require('./secure');
const response = require('../../network/response');
const Controller = require('./index');
const render = require('./render');

const router = express.Router();

// Routes
router.get('/', render.getVerUsuarios)
router.get('/:id', render.getVerUsuario);
router.post('/', render.postAgregarUsuario);
router.put('/', render.putEditarUsuario)

module.exports = router;