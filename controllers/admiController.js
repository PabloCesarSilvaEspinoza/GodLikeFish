//todo lo que requieras va aqui
const Controller = require('../components/user/index');
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
        const users = await Controller.list();

        console.log(users[0]);
        res.render('administrador/ejemplo', users);
    },
    postAdministradorPonentes: async function(req, res, next){
        res.render('administrador/PrincipalAdministrador-Ponentes', {

        });
    },
    postAdministrador: async function(req, res, next){
        res.render('administrador/PrincipalAdministrador', {

        });
    },
};