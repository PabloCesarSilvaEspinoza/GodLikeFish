const express = require('express');
const router = express.Router();
const upload = require('../../middlewares/subirArchivosCurso')
const render = require('./render');

router.get('/dashboardPonente', render.getDashboardPonente);
router.get('/consultarCursoPEI', render.getConsultarCursoPE1);
router.get('/consultarCursoPEII', render.getConsultarCursoPE2);
router.get('/consultarlumnos', render.getConsultarAlumnos);
router.get('/calificarTarea', render.getCalificarTarea);
router.get('/soporte', render.getSoporte);
router.post('/agregarExamen', render.postAgregarExamen);
/* router.get('/AgregarTareaPrueba', render.getAgregarTarea);
router.post('/AgregarTarea', upload.array('multimediaTarea'), render.postAgregarTarea);
router.get('/DescargarTarea', render.getDescargarArchivos); */

module.exports = router;