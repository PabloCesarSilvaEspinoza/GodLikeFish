//todo lo que requieras va aqui
// ejemplo: la base de datos (pool), bcrypt, helpers, etc.
//const procedimiento = require('../database/procedimientosInicio');

//aqui se exportan las funciones 
module.exports = {
    postPaginaPrincipal: async function(req, res, next){
        res.render('paginaPrincipal',{
            login:true
        });
    },

};