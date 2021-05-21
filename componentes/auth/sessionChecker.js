const chalk = require('chalk');
module.exports = {
    verificar (req, res, next) {
        //console.log(req.body);
        if (req.isAuthenticated()) {
            console.log(chalk.white.bgCyan.bold("Usuario autenticado"));
            return next();
        }
        console.log(chalk.white.bgRed.bold("No tienes una sessión"));
        return res.redirect('/');
    },
    verificacionEspecial (req, res, next) {
        //console.log(req.body);
        if (req.isAuthenticated()) {
            console.log(chalk.white.bgCyan.bold("Cerraste sesion"));
            req.session.destroy();
            return res.redirect('/');
        }
        return next();
    },
};