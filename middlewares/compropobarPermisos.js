const ControllerP = require('../componentes/ponente/index');

module.exports = {
    permisosTarea: async function(req, res, next)  {
        const tareaID = (req.params.idTarea)
                        ? req.params.idTarea
                        : req.body.idTarea;
        const respuestaPermisosTarea = await ControllerP.catalogPermisosTarea(req.user.id, tareaID);
        const permisosTarea = respuestaPermisosTarea[0][0].Permisos;
        if(permisosTarea){
            return next()
        } else{
            res.redirect('/ponente/dashboardPonente');
        }
    },
    permisosCurso: async function(req, res, next)  {
        const cursoID = (req.params.idCurso)
                        ? req.params.idCurso
                        : req.body.idCurso;
        const respuestaPermisosTarea = await ControllerP.catalogPermisosCurso(req.user.id, cursoID);
        const permisosTarea = respuestaPermisosTarea[0][0].Permisos;
        if(permisosTarea){
            return next()
        } else{
            res.redirect('/ponente/dashboardPonente');
        }
    },
};