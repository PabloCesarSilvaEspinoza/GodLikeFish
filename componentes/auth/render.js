const Controller = require('./index');

module.exports = {
    getLogin: async function (req, res, next) {
        res.render('usuario/u1_login', {
            general: true,
            select2: true
        });
    },
    getLogOut: async function (req, res, next) {
        req.session.destroy();
        res.redirect('/');
    },
    getConfirmarCorreo: async function (req, res, next) {
        res.render('usuario/u2_confirmarCorreo', {
            general: true
        });
    },
    getReestablecerContraseña: async function (req, res, next) {
        res.render('usuario/u3_reestablecerContraseña', {
            general: true
        });
    },
    getValidarPermisos: async function (req, res) {
        console.log("estoy validando los permisos de: " + req.user.rol);
        switch (req.user.rol) {
            case "Estudiante":
                res.redirect('/estudiante/dashboardEstudiante');
                break;
            case "Ponente":
                res.redirect('/ponente/dashboardPonente');
                break;
            case "Administrador":
            case "Super-Administrador":
                res.redirect('/administrador/dashboardAdministrador');
                break;
        }
    },
};