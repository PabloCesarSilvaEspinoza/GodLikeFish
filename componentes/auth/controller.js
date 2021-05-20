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

    return{
        validarUsuario,
        getUsuario
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