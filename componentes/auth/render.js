const { response } = require('express');
const Controller = require('./index');

module.exports = {
    postAgregarUsuario: async function (req, res, next) {
        const respuestaBD = await Controller.insertUsuario(req.body);
        const usuarioID = respuestaBD[0][0].ID;
        console.log(respuestaBD);
        let fotoUsuario
        (req.files.fotoUsuario)
            ? fotoUsuario = `${req.files.fotoUsuario[0].originalname}`
            : fotoUsuario = '';

        const tarjetonUsuario = `${req.files.tarjetonUsuario[0].originalname}`;
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
        const areas = await Controller.listAreas();
        res.render('usuario/u1_login', {
            general: true,
            pickadate: true,
            select2: true,
            paises,
            municipios,
            estados,
            puestos,
            areas,
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
            : res.redirect('/')
        )
    },

    getValidarCorreo: async function (req, res, next) {
        const usuario = await Controller.getUsuario(req.user.id);
        (usuario[0].correoVerificado
            ? (usuario[0].codigoVerificacion == "contraseniaTemporal"
                ? res.redirect('/reestablecerContrasenia')
                : res.redirect('/validarTarjeton')
            )
            : res.redirect('/confirmarCorreo')
        );
    },

    getValidarTarjeton: async function (req, res, next){
        const usuario = await Controller.getUsuario(req.user.id);
        (usuario[0].tarjetonVerificado
            ? res.redirect('/validarPermisos')
            : res.redirect('/')
        )
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
        if(req.isAuthenticated()){
            switch (req.user.rol) {
                case "Estudiante":
                    res.redirect('/estudiante/dashboardEstudiante');
                    break;
                case "Ponente":
                    console.log("Es " +req.user.id);
                    res.redirect('/ponente/dashboardPonente');
                    break;
                case "Administrador":
                case "Super-Administrador":
                    res.redirect('/administrador/dashboardAdministrador');
                    break;
            }
        }else{
            res.redirect('/');
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
        const data = await Controller.encontrarUsuarioCodigo(req.body.codigoVerificacion);//condigoVerificacion no puede llegar null > required
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
            res.redirect('/');
        }
    },

    postReestablecerContrasenia: async function (req, res, next) {
        if (req.body.usuarioPasswordNueva === req.body.usuarioPasswordConfirmar) {
            const password = req.body.usuarioPasswordNueva;
            const data = await Controller.getUsuario(req.user.id); //filtro, para no usar el de la cookie
            await Controller.actualizarContrasenia(data[0].idUsuario, password);
            (data[0].codigoVerificacion == "contraseniaTemporal"
                ? await Controller.desactivarCodigoVerificacion(data[0].idUsuario)
                : console.log("sin contraseña temporal")
            )
            console.log("Contrasenia actualizada");
            res.redirect('/logOut');
        } else {
            console.log("las contrasenias no coinciden");
            res.redirect('/reestablecerContrasenia');
        }
    },

    getCambiarCorreoElectronico: async function (req, res, next) {
        if (req.isAuthenticated()) {
            await Controller.generarCodigoVerificacion(req.user.id);
            const credencialUsuario = await Controller.getUsuario(req.user.id);
            await Controller.enviarCodigoVerificacion(
                credencialUsuario[0].correoUsuario,
                "Cambio de correo electronico",
                credencialUsuario[0].tipoUsuario,
                credencialUsuario[0].codigoVerificacion
            )
            res.redirect('/confirmarCambioCorreo')
        } else {
            console.log("no puedes acceder a esta vista sin una sesión");
            res.redirect('/');
        }
    },

    getConfirmarCambioCorreo: async function (req, res, next) {
        (req.isAuthenticated()
            ? res.render('usuario/u6_confirmarCambioCorreo',{
                general:true
            })
            : res.redirect('/')
        )
    },

    postConfirmarCambioCorreo: async function(req, res, next){
        const credencialUsuario = await Controller.getUsuario(req.user.id);
        (req.body.codigoVerificacion == credencialUsuario[0].codigoVerificacion
            ? res.redirect('/establecerNuevoCorreo')
            : res.redirect('/confirmarCambioCorreo')
        )
    },

    getEstablecerNuevoCorreo: async function(req,res,next){
        (req.isAuthenticated()
            ? res.render('usuario/u7_establecerNuevoCorreo',{
                general:true
            })
            : res.redirect('/')
        )
    },

    postEstablecerNuevoCorreo: async function(req,res,next){
        if(req.body.correoElectronico === req.body.confirmarCorreoElectronico){
            await Controller.actualizarCorreo(req.user.id, req.body.correoElectronico);
            await Controller.desactivarCodigoVerificacion(req.user.id);
            console.log("Correo Actualizado");
            res.redirect('/logOut');
        }else{
            res.redirect('/establecerNuevoCorreoElectronico')
        }
    },

    getMiPerfil: async function(req, res, next){
        //const miPerfil = req.perfilUsuario;
        if(req.isAuthenticated()){
            const miPerfil = await Controller.getMiPerfil(req.user.id);
            res.render('usuario/u4_miPerfil',{
                estudiante: (req.user.rol =="Estudiante"),
                ponente: (req.user.rol =="Ponente"),
                administrador: (req.user.rol =="Administrador" || req.user.rol =="Super-Administrador"),
                miPerfil
            });
        }else{
            res.redirect('/');
        }
    },

    getSoporte: async function(req, res, next){
        if(req.isAuthenticated()){
            const miPerfil = await Controller.getMiPerfil(req.user.id);
            res.render('usuario/u8_soporte',{
                estudiante: (req.user.rol =="Estudiante"),
                ponente: (req.user.rol =="Ponente"),
                administrador: (req.user.rol =="Administrador" || req.user.rol =="Super-Administrador"),
                miPerfil
            });
        }else{
            res.redirect('/');
        }
    },

};