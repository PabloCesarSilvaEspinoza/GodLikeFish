const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const { nanoid } = require('nanoid');
const chalk = require('chalk');
const { response } = require('express');

const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "raymerlinDaenny@gmail.com",
        pass: "vguhkclbzcvajqqe"
    }
});

const handlebarOptions = {
    viewEngine: {
        extName: '.hbs',
        partialsDir: 'views',
        layoutsDir: 'views/correo',
        defaultLayout: 'main'
    },
    viewPath: 'views',
    extName: '.hbs',
};

transport.use('compile', hbs(handlebarOptions));
transport.set('view engine', '.hbs');

module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../store/mysql');
    }

    async function encontrarUsuario(correo) {
        const VIEW = 'ver_Credenciales_Usuario';
        const CLAUSE = `WHERE correoUsuario = ?`;
        return store.get(VIEW, CLAUSE, correo);
    }
    async function encontrarUsuarioCodigo(codigo) {
        const VIEW = 'ver_Credenciales_Usuario';
        const CLAUSE = `WHERE codigoVerificacion = ?`;
        return store.get(VIEW, CLAUSE, codigo);
    }

    async function getDatosUsuario(id) {
        const VIEW = 'ver_Perfil_Usuario';
        const CLAUSE = `WHERE idUsuario = ?`;
        return store.get(VIEW, CLAUSE, id);
    }


    async function getUsuario(id) {
        const VIEW = 'ver_Credenciales_Usuario';
        const CLAUSE = `WHERE idUsuario = ?`;
        return store.get(VIEW, CLAUSE, id);
    }

    function listPaises() {
        const VIEW = 'ver_Paises';
        return store.list(VIEW);
    }

    function listEstados() {
        const VIEW = 'ver_Estados';
        return store.list(VIEW);
    }

    function listMunicipios() {
        const VIEW = 'ver_Municipios';
        return store.list(VIEW);
    }

    function listPuestos() {
        const VIEW = 'ver_Puestos';
        return store.list(VIEW);
    }

    async function validarUsuario(correo, password) {
        console.log(chalk.white.bgMagenta.bold("recibi:") + " " + correo + " " + password);
        const data = await encontrarUsuario(correo);
        if (data[0].passwordUsuario === password) {
            //borramos el password de las variables del programa no de la BD
            delete data[0].passwordUsuario;
            //crear usuario
            const usuario = {
                id: data[0].idUsuario,
                rol: data[0].tipoUsuario,
                correoVerificado: data[0].correoVerificado,
                tarjetonVerificado: data[0].tarjetonVerificado
            }
            return usuario;
        } else {
            throw error = new Error('Información Invalida');
        }
    }

    function insertUsuario(body) {
        const {
            correo, password, municipioResidenciaID, colonia, calle, numeroExt, nombres,
            pApellido, sApellido, matricula, fechaNacimiento, paisNacimientoID,
            municipioNacimientoID, area, puesto, antiguedad
        } = body;

        let numeroInt;
        (body.numeroInt == '')
            ? numeroInt = null
            : numeroInt = body.numeroInt;

        const PROCEDURE = `CALL agregar_Usuario( 
            '${correo}', '${password}', ${municipioResidenciaID}, '${colonia}', '${calle}',
            ${numeroExt}, ${numeroInt}, '${nombres}', '${pApellido}', '${sApellido}', '${matricula}',
            '${fechaNacimiento}', ${paisNacimientoID}, ${municipioNacimientoID}, '${area}',
            '${puesto}', '${antiguedad}'
            )`

        return store.upsert(PROCEDURE);
    }

    function insertMultimediaUsuario(usuarioID, fotoUsuario, tarjetonUsuario) {

        const PROCEDURE = `CALL agregar_Multimedia_Usuario( 
            ${usuarioID}, '${fotoUsuario}', '${tarjetonUsuario}'
            )`

        return store.upsert(PROCEDURE);
    }

    async function enviarCorreoBienvenida(to, subject, nombreUsuario, codigoVerificacion) {

        let mailOptions = {
            to,
            subject,
            template: 'correo/correoBienvenida',
            context: {
                nombreUsuario,
                codigoVerificacion
            }
        };

        transport.sendMail(mailOptions, (err, info) => {
            (err ? console.log('Error', err) : console.log(chalk.yellow.bgBlack.bold('Correo Enviado a :' + mailOptions.to)));
        });
    }

    async function enviarCodigoVerificacion(to, subject, nombreUsuario, codigoVerificacion) {

        let mailOptions = {
            to,
            subject,
            template: 'correo/codigoVerificacion',
            context: {
                nombreUsuario,
                codigoVerificacion
            }
        };

        transport.sendMail(mailOptions, (err, info) => {
            (err ? console.log('Error', err) : console.log(chalk.yellow.bgBlack.bold('Correo Enviado a :' + mailOptions.to)));
        });
    }

    async function enviarContraseniaTemporal(to, subject, contraseniaTemporal) {

        let mailOptions = {
            to,
            subject,
            template: 'correo/contraseniaTemporal',
            context: {
                contraseniaTemporal
            }
        };

        transport.sendMail(mailOptions, (err, info) => {
            (err ? console.log('Error', err) : console.log(chalk.yellow.bgBlack.bold('Correo Enviado a :' + mailOptions.to)));
        });
    }

    function verificarCorreo(id) {
        const PROCEDURE = `CALL verificar_Correo('${id}')`
        return store.insert(PROCEDURE);
    }

    async function generarCodigoVerificacion(id) {
        const codigo = await nanoid();
        const PROCEDURE = `CALL actualizar_Codigo_Verificacion('${id}', '${codigo}')`
        return store.insert(PROCEDURE);
    }

    async function desactivarCodigoVerificacion(id) {
        const codigo = null;
        const PROCEDURE = `CALL actualizar_Codigo_Verificacion('${id}', '${codigo}')`
        return store.insert(PROCEDURE);
    }

    async function establecerContraseniaTemporal(id) {
        const codigo = "contraseniaTemporal";
        const PROCEDURE = `CALL actualizar_Codigo_Verificacion('${id}', '${codigo}')`
        return store.insert(PROCEDURE);
    }

    async function generarContraseniaTemporal(id) {
        const contraseniaTemporal = await nanoid();
        actualizarContrasenia(id, contraseniaTemporal);
    }

    async function actualizarContrasenia(id, password){
        const PROCEDURE = `CALL editar_Password('${id}', '${password}')`
        return store.insert(PROCEDURE);
    }

    async function recuperarContrasenia(idUsuario, correo) {
        console.log("recibi: " + idUsuario + correo);
        await generarCodigoVerificacion(idUsuario);//
        const credencialUsuario = await encontrarUsuario(correo);
        const correoUsuario = credencialUsuario[0].correoUsuario;
        const tipoUsuario = credencialUsuario[0].tipoUsuario;
        const codigoVerificacion = credencialUsuario[0].codigoVerificacion;
        await enviarCodigoVerificacion(
            correoUsuario,
            "Recuperación de contraseña",
            tipoUsuario,
            codigoVerificacion
        );
    }

    return {
        encontrarUsuario,
        listPaises,
        listEstados,
        listMunicipios,
        listPuestos,
        validarUsuario,
        getUsuario,
        getDatosUsuario,
        insertUsuario,
        insertMultimediaUsuario,
        enviarCorreoBienvenida,
        enviarCodigoVerificacion,
        verificarCorreo,
        generarCodigoVerificacion,
        desactivarCodigoVerificacion,
        recuperarContrasenia,
        encontrarUsuarioCodigo,
        actualizarContrasenia,
        establecerContraseniaTemporal,
        generarContraseniaTemporal,
        enviarContraseniaTemporal
    }
}