//todo lo que requieras va aqui
// ejemplo: la base de datos (pool), bcrypt, helpers, etc.
//const procedimiento = require('../database/procedimientosInicio');

//aqui se exportan las funciones 
module.exports = {
    postPaginaPrincipal: async function(req, res, next){
        res.render('general/paginaPrincipal',{
            general:true,
            select2:true
        });
    },
    postInicio: async function(req, res, next){
        res.render('general/inicio',{
            general: true
        });
    },
    postConfirmarCorreo: async function(req, res, next){
        res.render('general/confirmarCorreo',{
            general: true
        });
    },
    postRegistrar: async function(req, res, next){
        res.render('general/registrar',{
            general: true,
            pickadate: true,
            select2: true
        });
    },
};