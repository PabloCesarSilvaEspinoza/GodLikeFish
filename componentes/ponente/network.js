const express = require('express');
const router = express.Router();
const upload = require('../../middlewares/subirArchivosCurso')
const render = require('./render');

router.get('/AgregarTareaPrueba', render.getAgregarTarea);
router.post('/AgregarTarea', upload.array('multimediaTarea'), render.postAgregarTarea);
router.get('/DescargarTarea', render.getDescargarArchivos);

module.exports = router;