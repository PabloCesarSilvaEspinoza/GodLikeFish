const Controller = require('./index');

module.exports = {
    getPaginaPrincipal: async function (req, res, next) {
        res.render('general/paginaPrincipal', {
            general: true,
            select2: true
        });
    },
    getConfirmarCorreo: async function (req, res, next) {
        res.render('general/confirmarCorreo', {
            general: true
        });
    },
    getValidarPermisos: async function (req, res) {
        console.log("estoy validando los permisos de: " + req.user.rol);
        switch (req.user.rol) {
            case "Estudiante":
                res.redirect('/estudiante/dashboardAlumno');
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