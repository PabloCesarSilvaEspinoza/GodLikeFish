const bcrypt = require('bcrypt');
const auth = require('../../auth');

module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../store/mysql');
    }

    function list() {
        const VIEW = 'ver_Credenciales_Usuario';
        //const CLAUSE = `WHERE \`Usuario\` = 'E'`;
        return store.list(VIEW/*, CLAUSE*/);
    }

    function get(correo) {
        const VIEW = 'ver_Credenciales_Usuario';
        const CLAUSE = `WHERE correoUsuario = ?`;
        return store.get(VIEW, CLAUSE, correo);
    }

    async function login(correo, password){ //devolver promesa
        console.log("llegaron: "+correo + " "+ password);
        const data = await get(correo);
        if(data[0].passwordUsuario === password){
            //Generar token
            return auth.sign(data[0].idUsuario);
        }else{
            throw error = new Error('Información Invalida');
        }
    }

    return{
        login
    }
}