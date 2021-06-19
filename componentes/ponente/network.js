const express = require('express');
const router = express.Router();
const uploadTarea = require('../../middlewares/subirArchivosTarea')
const uploadArchivos = require('../../middlewares/subirArchivosMultimediaCurso')
const {crearCarpetaTarea} = require('../../middlewares/crearDirectorios')
const {permisosTarea} = require('../../middlewares/compropobarPermisos')
const render = require('./render');

router.get('/dashboardPonente', render.getDashboardPonente);
router.get('/consultarlumnos', render.getConsultarAlumnos);
router.get('/calificarTarea/:idTarea', permisosTarea, render.getCalificarTarea);
router.get('/soporte', render.getSoporte);
router.post('/AgregarExamen', render.postAgregarExamen);
router.get('/curso/:idCurso', render.getConsultarEstadoCursoPonente);
router.post('/AgregarTarea', crearCarpetaTarea, uploadTarea.array('multimediaTarea'), render.postAgregarTarea);
router.post('/AgregarArchivos', uploadArchivos.array('multimediaCurso'), render.postAgregarArchivos);
router.post('/AgregarAviso/', render.postAgregarAviso);
router.post('/AgregarEnlace/', render.postAgregarEnlace);

router.post('/reportarProblemaCurso', render.postReportarProblemaCurso);
router.post('/reportarProblemaUsuario', render.postReportarProblemaUsuario);
router.get('/DescargarTareaCurso/:idTarea/:nombreArchivo', render.getDescargarArchivoTarea);
router.get('/DescargarArchivoCurso/:idCurso/:nombreArchivo', render.getDescargarArchivoCurso);
/* router.get('/AgregarTareaPrueba', render.getAgregarTarea);
router.post('/AgregarTarea', upload.array('multimediaTarea'), render.postAgregarTarea);
router.get('/DescargarTarea', render.getDescargarArchivos); */

module.exports = router;