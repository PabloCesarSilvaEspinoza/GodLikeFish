const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');
const {nanoid} = require('nanoid');
const bcrypt = require('bcrypt');
const chalk = require('chalk');
const { response } = require('express');

module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../store/mysql');
    }

    async function get(correo) {
        const VIEW = 'ver_Credenciales_Usuario';
        const CLAUSE = `WHERE correoUsuario = ?`;
        return store.get(VIEW, CLAUSE, correo);
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
        const data = await get(correo);
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

    async function enviarCorreo(from,to,subject,text,html) {
        //mailtrap
        let transport = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "3b7622158f3027",
                pass: "a2472f9c8c885c"
            }
        });
        //nodemail
        let mailOptions = {
            from,
            to,
            subject,
            text,
            html 
        };
        transport.sendMail(mailOptions, (error, info)=>{
            (error ? error = new Error('Correo no enviado') : console.log(chalk.blue.bgGray.bold("Correo Enviado")))
        });
    }
    
    async function enviarCorreoGmail(to,subject,codigoVerificacion) {
        //mailtrap
        let transport = nodemailer.createTransport({
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
                layoutsDir: 'views',
                defaultLayout: ''//en proceso de configuracion
            },
            viewPath: 'views',
            extName: '.hbs',
        };

        transport.use('compile', hbs(handlebarOptions));
        transport.set('view engine', '.hbs');

        //nodemail
        let mailOptions = {
            to,
            subject,
            template:'correo/codigoVerificacion',
            context: {
                codigoVerificacion
            } 
        };

        //console.log("enviando "+ mailOptions);
        
        transport.sendMail(mailOptions, (err,info)=>{
            (err ? console.log('Error', err): console.log('Enviado'));
        });
    }

    function verificarCorreo(id) {
        const PROCEDURE = `CALL verificar_Correo('${id}')`
        return store.insert(PROCEDURE);
    }

    async function generarCodigoVerificacion(id){
        const codigo = await nanoid();
        const PROCEDURE = `CALL actualizar_Codigo_Verificacion('${id}', '${codigo}')`
        return store.insert(PROCEDURE);
    }

    async function desactivarCodigoVerificacion(id){
        const codigo = "NoSolicitado";
        const PROCEDURE = `CALL actualizar_Codigo_Verificacion('${id}', '${codigo}')`
        return store.insert(PROCEDURE);
    }


    return{
        listPaises,
        listEstados,
        listMunicipios,
        listPuestos,
        validarUsuario,
        getUsuario,
        insertUsuario,
        insertMultimediaUsuario,
        enviarCorreo,
        enviarCorreoGmail,
        verificarCorreo,
        generarCodigoVerificacion,
        desactivarCodigoVerificacion
    }

}