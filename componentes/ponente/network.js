const express = require('express');
const router = express.Router();
const upload = require('../../middlewares/subirArchivosTarea')
const {crearCarpetaTarea} = require('../../middlewares/crearDirectorios')
const render = require('./render');

router.get('/dashboardPonente', render.getDashboardPonente);
router.get('/consultarCursoPEII', render.getConsultarCursoPE2);
router.get('/consultarlumnos', render.getConsultarAlumnos);
router.get('/calificarTarea', render.getCalificarTarea);
router.get('/soporte', render.getSoporte);
router.post('/agregarExamen', render.postAgregarExamen);
router.get('/curso/:idCurso', render.getConsultarCurso);
router.post('/AgregarTarea', crearCarpetaTarea, upload.array('multimediaTarea'), render.postAgregarTarea);

router.post('/reportarProblemaCurso', render.postReportarProblemaCurso);
router.post('/reportarProblemaUsuario', render.postReportarProblemaUsuario);
/* router.get('/AgregarTareaPrueba', render.getAgregarTarea);
router.post('/AgregarTarea', upload.array('multimediaTarea'), render.postAgregarTarea);
router.get('/DescargarTarea', render.getDescargarArchivos); */

module.exports = router;