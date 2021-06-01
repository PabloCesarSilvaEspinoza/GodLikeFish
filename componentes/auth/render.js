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
        (req.isAuthenticated() ?
            res.render('usuario/u2_confirmarCorreo', {
                general: true
            })
            : res.redirect('/')
        )
    },

    getReestablecerContraseña: async function (req, res, next) {
        res.render('usuario/u3_reestablecerContraseña', {
            general: true
        });
    },

    getValidarCorreo: async function (req, res, next) {
        const usuario = await Controller.getUsuario(req.user.id);
        (usuario[0].correoVerificado ? res.redirect('/validarPermisos') : res.redirect('/confirmarCorreo'));
    },

    postVerificarCorreo: async function (req, res, next) {
        const usuario = await Controller.getUsuario(req.user.id);
        //ver si el codigo coincide y cambiar el estado
        if (usuario[0].codigoVerificacion == req.body.codigoVerificacion){
            Controller.verificarCorreo(req.user.id);
            console.log("Verificado");
            res.redirect('/logOut');
        }else{
            console.log("no coinciden");
        } 
    },

    getValidarPermisos: async function (req, res) {
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

    postReenviarCodigoVerificacion: async function (req, res, next) {
        await Controller.generarCodigoVerificacion(req.user.id);
        const usuario = await Controller.getUsuario(req.user.id);
        const correoUsuario = usuario[0].correoUsuario;
        const codigoVerificacion = usuario[0].codigoVerificacion;
        console.log(codigoVerificacion);
        await Controller.enviarCorreo("gdl@gmail.com", correoUsuario, "Código de Verificación: Godlike Fish.", codigoVerificacion);
        res.redirect('/confirmarCorreo')
    },

    //Para las rutas de Pruebas
    getEnviarCorreoGmail: async function (req, res, next) {
        console.log("por enviar");
        await Controller.enviarCorreoGmail(
            "browntth@icloud.com",
            "GDL by Raymerlin prueba",
            "Prueba Nodemailer",
            "funciona! 7u7"
        );
        res.redirect('/');
    }, 
};