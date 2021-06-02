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
        (usuario[0].correoVerificado 
            ? res.redirect('/validarPermisos') 
            : res.redirect('/confirmarCorreo')
        );
    },

    postVerificarCorreo: async function (req, res, next) {
        const usuario = await Controller.getUsuario(req.user.id);
        if (usuario[0].codigoVerificacion == req.body.codigoVerificacion){
            await Controller.verificarCorreo(req.user.id);//esperar aqui
            console.log("Verificado");
            await Controller.desactivarCodigoVerificacion(req.user.id)//desactivar
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

    postEnviarCodigoVerificacion: async function (req, res, next) {
        await Controller.generarCodigoVerificacion(req.user.id);
        const usuario = await Controller.getUsuario(req.user.id);
        const correoUsuario = usuario[0].correoUsuario;
        const codigoVerificacion = usuario[0].codigoVerificacion;
        const datosUsuario = await Controller.getDatosUsuario(req.user.id);
        const nombreUsuario = datosUsuario[0].nombreUsuario;
        if(codigoVerificacion == "NoSolicitado"){
            res.redirect('/');
        }
        await Controller.enviarCodigoVerificacion(
            correoUsuario, 
            "Código de Verificación: Godlike Fish.", 
            nombreUsuario,
            codigoVerificacion);
        res.redirect('/confirmarCorreo')
    },
    
};