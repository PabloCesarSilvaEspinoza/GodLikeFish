const Controller = require('./index');

module.exports = {
    postAgregarUsuario: async function (req, res, next){
        const respuestaBD = await Controller.insertUsuario(req.body);
        const usuarioID = respuestaBD[0][0].ID;

        let fotoUsuario
        (req.files.fotoUsuario)
            ? fotoUsuario = `${usuarioID}/${req.files.fotoUsuario[0].originalname}`
            : fotoUsuario = '';

        const tarjetonUsuario = `${usuarioID}/${req.files.tarjetonUsuario[0].originalname}`;
        console.log(usuarioID + fotoUsuario + tarjetonUsuario);
        await Controller.insertMultimediaUsuario(usuarioID, fotoUsuario, tarjetonUsuario)
        res.redirect('/')
    },
    getLogin: async function (req, res, next) {
        const paises = await Controller.listPaises();
        const estados = await Controller.listEstados();
        const municipios = await Controller.listMunicipios();
        const puestos = await Controller.listPuestos();
        res.render('usuario/u1_login',{
            general: true,
            pickadate: true,
            select2: true,
            paises,
            municipios,
            estados,
            puestos,
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