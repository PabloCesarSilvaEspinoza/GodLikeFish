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

    async function login(correo, password){
        //const data = await store.query(TABLA, {correo: correo});
        const data = {
            correo:"pablo@gmail.com",
            password: "123"
        }
        return compare(password, data.password)
            .then(sonIguales =>{
                if(sonIguales){
                    //generar token
                    return auth.sign(data);
                    }else{
                        throw new Error('Informacion invalida');
                }
        })
    }

    return{
        login,
    }
}