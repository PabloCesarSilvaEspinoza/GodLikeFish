const express = require('express');
const router = express.Router();
const render = require('./render');

router.get('/dashboardAlumno', render.postDashboardAlumno);
router.get('/misAsignaciones', render.postMisAsignaciones);
router.get('/consultarCursoEI', render.postConsultarCursoE1);
router.get('/consultarCursoEII', render.postConsultarCursoE2);
router.get('/consultarCursoEIII', render.postConsultarCursoE3);

/* router.get('/', render.getVerTareas);
router.get('/:id', render.getVerTarea);
router.post('/', render.postAgregarTarea);
router.put('/', render.putEditarTarea); */

module.exports = router;