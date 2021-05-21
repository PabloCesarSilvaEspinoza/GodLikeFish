const express = require('express');
const router = express.Router();
const render = require('./render');

router.get('/dashboardEstudiante', render.getDashboardAlumno);
router.get('/misAsignaciones', render.getMisAsignaciones);
router.get('/consultarCursoEI', render.getConsultarCursoE1);
router.get('/consultarCursoEII', render.getConsultarCursoE2);
router.get('/consultarCursoEIII', render.getConsultarCursoE3);
router.get('/soporte', render.getSoporte);

/* router.get('/', render.getVerTareas);
router.get('/:id', render.getVerTarea);
router.post('/', render.postAgregarTarea);
router.put('/', render.putEditarTarea); */

module.exports = router;