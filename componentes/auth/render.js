const { response } = require('express');
const Controller = require('./index');

module.exports = {
    postAgregarUsuario: async function (req, res, next) {
        const respuestaBD = await Controller.insertUsuario(req.body);
        const usuarioID = respuestaBD[0][0].ID;

        let fotoUsuario
        (req.files.fotoUsuario)
            ? fotoUsuario = `${usuarioID}/${req.files.fotoUsuario[0].originalname}`
            : fotoUsuario = '';

        const tarjetonUsuario = `${usuarioID}/${req.files.tarjetonUsuario[0].originalname}`;
        console.log(usuarioID + fotoUsuario + tarjetonUsuario);
        await Controller.insertMultimediaUsuario(usuarioID, fotoUsuario, tarjetonUsuario);
        //enviamos el correo de bienvenida
        await Controller.generarCodigoVerificacion(usuarioID);
        const usuario = await Controller.getUsuario(usuarioID);
        const codigoVerificacion = usuario[0].codigoVerificacion;
        const correoUsuario = usuario[0].correoUsuario;
        const datosUsuario = await Controller.getDatosUsuario(usuarioID);
        const nombreUsuario = datosUsuario[0].nombreUsuario;
        await Controller.enviarCorreoBienvenida(
            correoUsuario,
            "Bienvenido al Sistema de Cursos Onlin GDL-Fish",
            nombreUsuario,
            codigoVerificacion
        );
        res.redirect('/')
    },

    getLogin: async function (req, res, next) {
        const paises = await Controller.listPaises();
        const estados = await Controller.listEstados();
        const municipios = await Controller.listMunicipios();
        const puestos = await Controller.listPuestos();
        res.render('usuario/u1_login', {
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
        (req.isAuthenticated()
            ? ((req.user.correoVerificado
                ? res.redirect('/')
                : res.render('usuario/u2_confirmarCorreo', {
                    general: true
                })
            ))
            : res.redirect('/')
        )
    },

    getReestablecerContrasenia: async function (req, res, next) {
        (req.isAuthenticated()
            ? res.render('usuario/u3_reestablecerContraseña', {
                general: true
                })
            : res.redirect('/login')
        )
    },

    getValidarCorreo: async function (req, res, next) {
        const usuario = await Controller.getUsuario(req.user.id);
        (usuario[0].correoVerificado
            ?( usuario[0].codigoVerificacion == "contraseniaTemporal"
                ? res.redirect('/reestablecerContrasenia')
                : res.redirect('/validarPermisos')
            )
            : res.redirect('/confirmarCorreo')
        );
    },

    postVerificarCorreo: async function (req, res, next) {
        const usuario = await Controller.getUsuario(req.user.id);
        if (usuario[0].codigoVerificacion == req.body.codigoVerificacion) {
            await Controller.verificarCorreo(req.user.id);
            console.log("Verificado");
            await Controller.desactivarCodigoVerificacion(req.user.id);
            res.redirect('/logOut');
        } else {
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
        await Controller.enviarCodigoVerificacion(
            correoUsuario,
            "Código de Verificación: Godlike Fish.",
            nombreUsuario,
            codigoVerificacion
        );
        res.redirect('/confirmarCorreo')
    },
    getVerificarCodigo: async function (req, res, next) {
        res.render('usuario/u5_verificacionConCorreo', {
            general: true
        });
    },

    postRecuperarContrasenia: async function (req, res, next) {
        const data = await Controller.encontrarUsuario(req.body.email);
        console.log(data);
        if (data.length === 0) {
            console.log("no existe usuario con ese correo");
            res.redirect('/');
        } else {
            await Controller.recuperarContrasenia(data[0].idUsuario, req.body.email);
            res.redirect('/verificarCodigo');
        }
    },

    postValidarCodigo: async function (req, res, next) {
        const data = Controller.encontrarUsuarioCodigo(req.body.codigoVerificacion);//condigoVerificacion no puede llegar null > required
        if (data.length === 0) {
            console.log("El codigo es incorrecto");
            req.redirect('/verificarCodigo')
        } else {
            await Controller.establecerContraseniaTemporal(data[0].idUsuario);
            await Controller.generarContraseniaTemporal(data[0].idUsuario);
            const credencialUsuario = await Controller.getUsuario(data[0].idUsuario);
            await Controller.enviarContraseniaTemporal(
                credencialUsuario[0].correoUsuario,
                "Contraseña temporal - GDL Fish Cursos",
                credencialUsuario[0].passwordUsuario
                );
            res.redirect('/login');
        }
    },

    postReestablecerContrasenia: async function (req, res, next){
        if(req.body.usuarioPasswordNueva === req.body.usuarioPasswordConfirmar){
            const password = req.body.usuarioPasswordNueva;
            const data = await Controller.getUsuario(req.user.id); //filtro
            await Controller.actualizarContrasenia(data[0].idUsuario, password);
            await Controller.desactivarCodigoVerificacion(data[0].idUsuario);
            console.log("Contrasenia actualizada");
            res.redirect('/logOut');
        }else{
            console.log("las contrasenias no coinciden");
            res.redirect('/reestablecerContrasenia')
        }
    }

};