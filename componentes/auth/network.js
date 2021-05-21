const express = require('express');
const passport = require('passport');
const passportLocal = require('passport-local').Strategy;
const render = require('./render');
const response = require('../../network/response');
const Controller = require('./index');
const chalk = require('chalk');
const router = express.Router();

//Para poder subir archivos de un usuario
const upload = require('../../middlewares/subirArchivosUsuario')
const {crearCarpetaUsuario} = require('../../middlewares/crearDirectorios')
const dobleInput = upload.fields([{name: 'fotoUsuario'}, {name: 'tarjetonUsuario'}])


router.post('/agregarUsuario', crearCarpetaUsuario, dobleInput, render.postAgregarUsuario);

router.get('/', render.getPaginaPrincipal);
router.get('/confirmarCorreo', render.getConfirmarCorreo);

router.post('/login',passport.authenticate('local', {
    //esto cambia segun el rol del usuario
    successRedirect: "/primeraPrueba",
    failureRedirect: "/"
}));

passport.use(new passportLocal(function (username,password, done){
    console.log(username, password);
    Controller.validarUsuario(username, password)
        .then(user =>{
            console.log(user);
            return done(null, user);
        })
        .catch(error => {
            return done(null, false);
            //response.error(req, res, 'Informacion invalida', 400);
        })
}));

//serealización
passport.serializeUser(function(user,done){
    done(null, user)
});

//deserialización
passport.deserializeUser(function(user,done){
    done(null, user)
});
/*
passport.deserializeUser(function (id, done) {
    done(null,
        Controller.getUsuario(id)
            .then(user => {
                console.log(user);
            })
            .catch(error => {
                response.error(req, res, 'Informacion invalida', 400);
            })
    )
});*/

module.exports = router;

/*
router.post('/login', function(req,res){
    //console.log(req.body);
    passport.authenticate(
        Controller.login(req.body.correoUsuario, req.body.passwordUsuario)
        .then(token => {
            response.success(req, res, token, 200);
            console.log(chalk.cyan(token));
            //console.log(res.correoUsuario, res.passwordUsuario, token);
        })
        .catch(error => {
            response.error(req, res, 'Informacion invalida', 400);
        }),
        { successRedirect: '/primeraPrueba', failureRedirect: '/login' }
    )
});


router.post('/login', function (req, res) {
    let username = req.body.correoUsuario;
    let password = req.body.passwordUsuario;
    Controller.validar(username, password)
        .then(done => {
            passport.authenticate('local', {
                successRedirect: "/primeraPrueba",
                failureRedirect: "/"
            })
        })
        .catch(error => {

        })
},
);
*/
