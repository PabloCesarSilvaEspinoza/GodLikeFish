const nodemailer = require('nodemailer');
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
                rol: data[0].tipoUsuario
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
            
        return store.insert(PROCEDURE);
    }

    function insertMultimediaUsuario(usuarioID, fotoUsuario, tarjetonUsuario) {

        const PROCEDURE = `CALL agregar_Multimedia_Usuario( 
            ${usuarioID}, '${fotoUsuario}', '${tarjetonUsuario}'
            )`

        return store.insert(PROCEDURE);
    }

    async function enviarCorreo(from,to,subject,text) {
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
        from="0a250cecf0-de742e@inbox.mailtrap.io";
        let mailOptions = {from,to,subject,text};
        transport.sendMail(mailOptions, (error, info)=>{
            (error ? error = new Error('Correo no enviado') : console.log(chalk.blue.bgGray.bold("Correo Enviado")))
        });
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
        enviarCorreo
    }

}