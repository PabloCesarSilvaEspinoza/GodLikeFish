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
    postAdministrador: async function(req, res, next){
        res.render('administrador/PrincipalAdministrador', {

        });
    },
    postDashboard: async function(req, res, next){
        res.render('administrador/dashboard')
    }
};