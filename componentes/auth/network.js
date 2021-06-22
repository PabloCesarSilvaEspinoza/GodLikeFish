const express = require('express');
const passport = require('passport');
const passportLocal = require('passport-local').Strategy;
const render = require('./render');
const Controller = require('./index');
const router = express.Router();

//Para poder subir archivos de un usuario
const upload = require('../../middlewares/subirArchivosUsuario')
const {crearCarpetaUsuario} = require('../../middlewares/crearDirectorios')
const dobleInput = upload.fields([{name: 'fotoUsuario'}, {name: 'tarjetonUsuario'}])

router.get('/', render.getLogin);
router.get('/confirmarCorreo', render.getConfirmarCorreo);
router.get('/reestablecerContrasenia', render.getReestablecerContrasenia);
router.post('/reestablecerContrasenia', render.postReestablecerContrasenia);

router.post('/login', passport.authenticate('local', {
    successRedirect: "/validarCorreo",
    failureRedirect: "/"
}));
router.get('/logOut', render.getLogOut);

router.post('/agregarUsuario', crearCarpetaUsuario, dobleInput, render.postAgregarUsuario);
router.get('/validarCorreo', render.getValidarCorreo);
router.post('/verificarCorreo', render.postVerificarCorreo);
router.get('/validarPermisos', render.getValidarPermisos);
router.get('/validarTarjeton', render.getValidarTarjeton);

router.get('/verificarCodigo', render.getVerificarCodigo);
router.post('/validarCodigo', render.postValidarCodigo);

router.post('/enviarCodigoVerificacion', render.postEnviarCodigoVerificacion);
router.post('/recuperarContrasenia', render.postRecuperarContrasenia);

router.get('/cambiarCorreoElectronico', render.getCambiarCorreoElectronico);
router.get('/confirmarCambioCorreo', render.getConfirmarCambioCorreo);
router.post('/confirmarCambioCorreo', render.postConfirmarCambioCorreo);
router.get('/establecerNuevoCorreo', render.getEstablecerNuevoCorreo);
router.post('/establecerNuevoCorreo', render.postEstablecerNuevoCorreo);

/* rutas comunes entre usuarios */
router.get('/miPerfil', render.getMiPerfil);
router.get('/soporte', render.getSoporte);


passport.use(new passportLocal(function (username, password, done) {
    Controller.validarUsuario(username, password)
        .then(user => {
            console.log(user);
            return done(null, user);
        })
        .catch(error => {
            return done(null, false);
        })
}));

passport.serializeUser(function (user, done) {
    done(null, user)
});

passport.deserializeUser(function (user, done) {
    done(null, user)
});

module.exports = router;

