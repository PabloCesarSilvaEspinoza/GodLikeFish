const express = require('express');
const router = express.Router();
const render = require('./render');
const uploadTareaEstudiante = require('../../middlewares/subirArchivosTareaEstudiante')
const {crearCarpetaTareaEstudiante} = require('../../middlewares/crearDirectorios')

router.get('/dashboardEstudiante', render.getDashboardAlumno);
router.get('/misAsignaciones', render.getMisAsignaciones);
//getConsultarCursoE1
router.get('/curso/:idCurso', render.getConsultarEstadoCursoEstudiante);
router.post('/Inscribirse', render.postInscribirse)
//router.get('/soporte', render.getSoporte, render.postEnviarReporte);
router.get('/DescargarTemario/:idCurso', render.getDescargarTemario);
router.post('/insertCalificaciónExperiencia/:idCurso', render.postCalificarExperiencia);
router.get('/DescargarTareaCurso/:idTarea/:nombreArchivo', render.getDescargarArchivoTarea);
router.get('/DescargarArchivoCurso/:idCurso/:nombreArchivo', render.getDescargarArchivoCurso);
router.post('/EntregarTarea/:idTarea', crearCarpetaTareaEstudiante, uploadTareaEstudiante.array('multimediaEstudiante'), render.postEntregarTarea);
router.get('/DescargarArchivoEntregado/:idTarea/:nombreArchivo', render.getDescargarArchivoEntregado);
router.post('/reportarProblemaUsuario', render.postReportarProblemaUsuario);
router.post('/VerificarClaveCurso/', render.postVerificarClaveCurso)

router.get('/CatalogoCursos/', render.getCatalogoCursos);

/* router.get('/', render.getVerTareas);
router.get('/:id', render.getVerTarea);
router.post('/', render.postAgregarTarea);
router.put('/', render.putEditarTarea); */

module.exports = router;