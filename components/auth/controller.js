const bcrypt = require('bcrypt');
const auth = require('../../auth');
const TABLA = 'auth';

module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../store/dummy');
    }

    async function login(correo, password){
        const data = await store.query(TABLA, {correo: correo});
        return bcrypt.compare(password, data.password)
            .then(sonIguales =>{
                if(sonIguales){
                    //generar token
                    return auth.sign(data);
                    }else{
                        throw new Error('Informacion invalida');
                }
        })
    }

    async function upsert(data){
        const authData = {
            id: data.id,
        }

        if(data.correo){
            authData.correo = data.correo;
        }
        if(data.password){
            authData.password = await bcrypt.hash(data.password, 5);
        }

        return store.upsert(TABLA, authData);
    }
    return{
        login,
        upsert,
    }
}