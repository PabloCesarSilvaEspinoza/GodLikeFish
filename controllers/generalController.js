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