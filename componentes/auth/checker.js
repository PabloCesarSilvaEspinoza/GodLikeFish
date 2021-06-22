const chalk = require('chalk');
module.exports = {
    verificar(req, res, next) {
        if (req.isAuthenticated()) {
            console.log(chalk.white.bgCyan.bold("Usuario autenticado"));
            return next();
        }
        console.log(chalk.white.bgRed.bold("No tienes una sessión"));
        return res.redirect('/');
    },

    verificarAdministrador(req, res, next) {
        console.log("valido permisos de: " + req.user.rol);
        if (req.user.rol == "Administrador" || req.user.rol == "Super-Administrador") {
            return next();
        } else {
            console.log('No tienes permisos de administrador');
            return res.end();
        }
    },

    verificarPonente(req, res, next) {
        console.log("valido permisos de: " + req.user.rol);
        if (req.user.rol == "Ponente") {
            return next();
        } else {
            console.log('No tienes permisos de ponente');
            return res.end();
        }
    },
    
    verificarEstudiante(req, res, next) {
        console.log("valido permisos de: " + req.user.rol + "Correo y tarjeton verificados "+ req.user.correoVerificado +" "+ req.user.tarjetonVerificado);
        if(req.user.correoVerificado && req.user.rol == "Estudiante"){
            return next();
        }else if(!req.user.correoVerificado){
            return res.redirect('/confirmarCorreo');
        }else{
            console.log('No tienes permisos de estudiante');
            return res.end();
        }
    }
};