const express = require('express');
const router = express.Router();
const upload = require('../../middlewares/subirArchivosTarea')
const {crearCarpetaTarea} = require('../../middlewares/crearDirectorios')
const render = require('./render');

router.get('/dashboardPonente', render.getDashboardPonente);
router.get('/consultarCursoPEI', render.getConsultarCursoPE1);
router.get('/consultarCursoPEII', render.getConsultarCursoPE2);
router.get('/consultarlumnos', render.getConsultarAlumnos);
router.get('/calificarTarea', render.getCalificarTarea);
router.get('/soporte', render.getSoporte);
router.post('/AgregarTarea', crearCarpetaTarea, upload.array('multimediaTarea'), render.postAgregarTarea);
/* router.get('/AgregarTareaPrueba', render.getAgregarTarea);
router.post('/AgregarTarea', upload.array('multimediaTarea'), render.postAgregarTarea);
router.get('/DescargarTarea', render.getDescargarArchivos); */

module.exports = router;