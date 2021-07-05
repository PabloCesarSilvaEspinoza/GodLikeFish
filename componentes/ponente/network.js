const express = require('express');
const router = express.Router();
const uploadTarea = require('../../middlewares/subirArchivosTarea')
const uploadArchivos = require('../../middlewares/subirArchivosMultimediaCurso')
const {crearCarpetaTarea} = require('../../middlewares/crearDirectorios')
const {permisosTarea} = require('../../middlewares/compropobarPermisos')
const {permisosCurso} = require('../../middlewares/compropobarPermisos')
const render = require('./render');

router.get('/dashboardPonente', render.getDashboardPonente);
router.get('/consultarAlumnos/:idCurso', permisosCurso, render.getConsultarAlumnos);
router.post('/CalificarEntrega/', permisosTarea, render.postCalificarEntrega);
router.post('/TerminarCalificarTarea/', permisosTarea, render.postTerminarCalificarTarea);
router.get('/CalificarTarea/:idTarea', permisosTarea, render.getCalificarTarea);
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
router.get('/consultarCursos', render.getConsultarCursos);

router.post('/borrarExamen/:idExamen', render.postDeleteExamen);
router.post('/editarExamen/:id', render.putEditarExamen);

router.post('/borrarAviso/:idAviso', render.postDeleteAviso);
router.post('/editarAviso/:id', render.putEditarAviso);

router.post('/borrarLink/:idLink', render.postDeleteLink);
router.post('/editarLink/:id', render.putEditarLinks);

router.post('/borrarAsignacion/:idTarea', render.postDeleteAsignacion);
router.post('/editarAsignaicon/:id',  uploadArchivos.array('multimediaTarea'), render.putEditarAsignacion);

router.post('/borrarDocumento/:idDocumento', render.postDeleteDocumento);

router.post('/CalificarEstudiante/', permisosCurso, render.postCalificarEstudiante);
router.get('/DescargarTemario/:idCurso', render.getDescargarTemario);
router.get('/DescargarArchivoEntrega/:idEstudiante/:idTarea/:nombreArchivo', render.getDescargarArchivoEntrega);
/* router.get('/AgregarTareaPrueba', render.getAgregarTarea);
router.post('/AgregarTarea', upload.array('multimediaTarea'), render.postAgregarTarea);
router.get('/DescargarTarea', render.getDescargarArchivos); */

module.exports = router;