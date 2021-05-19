const express = require('express');
const passport = require('passport');
const render = require('./render');
const response = require('../../network/response');
const Controller = require('./index');
const chalk = require('chalk');

const router = express.Router();

router.get('/', render.postPaginaPrincipal);
router.get('/confirmarCorreo', render.postConfirmarCorreo);

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


module.exports = router;
