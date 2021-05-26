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
    verificacionEspecial(req, res, next) {
        if (req.isAuthenticated()) {
            console.log(chalk.white.bgCyan.bold("Cerraste sesion"));
            req.session.destroy();
            return res.redirect('/');
        }
        return next();
    },
    verificarAdministrador(req, res, next) {
        console.log("valido permisos de: " + req.user.rol);
        if (req.user.rol == "Administrador") {
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
        if (req.user.rol == "Estudiante") {
            return next();
        } else {
            console.log('No tienes permisos de estudiante');
            return res.end();
        }
    },
};