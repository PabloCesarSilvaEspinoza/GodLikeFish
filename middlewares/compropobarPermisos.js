const ControllerP = require('../componentes/ponente/index');

module.exports = {
    permisosTarea: async function(req, res, next)  {
        const respuestaPermisosTarea = await ControllerP.catalogPermisosTarea(req.user.id, req.params.idTarea);
        const permisosTarea = respuestaPermisosTarea[0][0].Permisos;
        if(permisosTarea){
            return next()
        } else{
            res.redirect('/ponente/dashboardPonente');
        }
    },
};