const express = require('express');
const router = express.Router();
const upload = require('../../middlewares/upload')
const render = require('./render');

router.get('/dashboardPonente', render.postDashboardPonente);
router.get('/ConsultarCursoPEI', render.postConsultarCursoPE1);
router.get('/ConsultarCursoPEII', render.postConsultarCursoPE2);
router.get('/Consultarlumnos', render.postConsultarAlumnos);
router.get('/CalificarTarea', render.postCalificarTarea);

/* router.get('/AgregarTareaPrueba', render.getAgregarTarea);
router.post('/AgregarTarea', upload.array('multimediaTarea'), render.postAgregarTarea);
router.get('/DescargarTarea', render.getDescargarArchivos); */

module.exports = router;