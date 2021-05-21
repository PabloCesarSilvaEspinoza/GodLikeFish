const bcrypt = require('bcrypt');
const auth = require('../../auth');
const chalk = require('chalk');

module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../store/mysql');
    }

    function list() {
        const VIEW = 'ver_Credenciales_Usuario';
        return store.list(VIEW/*, CLAUSE*/);
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

    async function validarUsuario(correo, password){
        console.log(chalk.white.bgMagenta.bold("recibi:")+" "+ correo + " "+ password);
        const data = await get(correo);
        if(data[0].passwordUsuario === password){
            //borramos el password de las variables del programa no de la BD
            delete data[0].passwordUsuario;
            //crear usuario
            const usuario = {
                id: data[0].idUsuario,
                rol: data[0].tipoUsuario
            }
            return usuario;
        }else{
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

    return{
        listPaises,
        listEstados,
        listMunicipios,
        listPuestos,
        validarUsuario,
        getUsuario,
        insertUsuario,
        insertMultimediaUsuario,
    }
}

/* 
    async function login(correo, password){ //devolver promesa
        console.log(chalk.white.bgMagenta.bold("recibi:")+" "+ correo + " "+ password);
        const data = await get(correo);
        // Cuando se implemente el hash de password en el registro vamos a validar así:
        //return bcrypt.compare(password, data[0].passwordUsuario)
        //.then(sonIguales =>{
        //    if(sonIguales === true){
        //        return auth.sign(data[0].idUsuario);
        //    }else{
        //        throw error = new Error('Información Invalida');
        //    }
        //});
        
        if(data[0].passwordUsuario === password){
            //borramos el password del programa no de la BD
            delete data[0].passwordUsuario;
            //crear payload del token
            const payload = {
                sub: data[0].idUsuario,
                correo,
                rol: data[0].tipoUsuario
            }
            //console.log(payload);
            //generar token
            return auth.sign(payload);
        }else{
            throw error = new Error('Información Invalida');
        }
    }
 */