const express = require('express');
const router = express.Router();
const upload = require('../../middlewares/subirArchivosCurso')
const {crearCarpetaCurso} = require('../../middlewares/crearDirectorios')
const render = require('./render');
const { eliminarFoto } = require('../../middlewares/eliminarFoto');
const uploadEdit = require('../../middlewares/subirArchivosCursoEditar');
const { eliminarDocumento } = require('../../middlewares/eliminarArchivos');
const single = uploadEdit.single('archivo')
const dobleInput = upload.fields([{name: 'fotoCurso'}, {name: 'temarioCurso'}])

router.get('/dashboardAdministrador', render.getDashboardAdministrador);
router.get('/administrarCursos', render.getAdministrarCursos);
router.get('/administrarUsuarios', render.getAdministrarUsuarios);
router.get('/curso/:idCurso', render.getConsultarCurso);
router.post('/agregarCurso', crearCarpetaCurso, dobleInput, render.postAgregarCurso);
router.post('/editarCurso/:idCurso', render.postEditarCurso);
router.post('/editarUsuarios/:id', render.postEditarUsuario);
router.post('/editarFoto/:idCurso', eliminarFoto, single, render.postEditarFotoCurso);
router.post('/editarTemario/:idCurso', eliminarDocumento, single, render.postEditarTemarioCurso);
router.post('/estadoCurso/:idCurso/:estado', render.postEditarEstadoCurso);
router.post('/estadoUsuario/:idUsuario/:estado', render.postEditarEstadoUsuario);
router.get('/usuario/:idUsuario', render.getPerfilUsuario)

router.get('/DescargarTarjetonUsuario/:idUsuario/:nombreTarjeton', render.getDescargarTarjetonUsuario);
router.post('/ResolverProblema/:tipoProblema', render.postResolverProblema);
router.post('/VerificarTarjetonUsuario', render.postVerificarTarjetonUsuario);
router.post('/enviarCorreo', render.postCorreoPersonalizado);

router.post('/desactivarCursoUsuario/:idUsuario/:idCursoActual', render.postDesactivarCursoUsuario);
 
module.exports = router;