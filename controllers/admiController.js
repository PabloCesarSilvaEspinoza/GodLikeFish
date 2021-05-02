//todo lo que requieras va aqui
// ejemplo: la base de datos (pool), bcrypt, helpers, etc.
//const procedimiento = require('../database/procedimientosInicio');

//aqui se exportan las funciones 
module.exports = {

    postTarjetasPonentes: async function(req, res, next){
        res.render('administrador/TarjetasDePonentes', {

        });
    },

    postEditarPonente: async function(req, res, next){
        res.render('administrador/EditarPonente', {
        
        }
    )},

    postEjemplo: async function(req, res, next){
        res.render('administrador/ejemplo',{

        });
    },
    postAdministradorPonentes: async function(req, res, next){
        res.render('administrador/PrincipalAdministrador-Ponentes', {

        });
    },

};