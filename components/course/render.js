const course = require('./index');
const Controller = require('./index');

module.exports = {

    getVerCursos: async function (req, res, next) {
        const courses = await Controller.list();
    },

    getVerCurso: async function (req, res, next) {
        const id = req.params.id;
        const course = await Controller.get(id);
        res.render('course/detallesCurso', course[0]);
    },

    postAgregarCurso: async function (req, res, next) {
        await Controller.insert(req.body);
        res.redirect('/');
    },

    putEditarCurso: async function (req, res, next) {
        await Controller.update(req.body);
        res.redirect('/');
    },
    getPrincipalAdministradorPonentes: async function (req, res, next) {
        res.render('administrador/PrincipalAdministrador-Ponentes', {
            datatables: true,
            
            ponentes: [{
            nombre: "Amelia Rojas",
            cargo: "Profesor 2",
            area: "Medica",
            edad:"39",
            antiguedad:"4"
            }],
            etiquetasPonentes:[{
                ponentesRegistrados:"2",
                ponentesConCurso:"78",
                ponentesSinCurso:"8"
            }],
            datosResumenPonentes:[{
                resumenRegistrados:"90",
                resumenActivos:"34",
                resumenInactivos:"90"
            }]

        });
    },
    getPrincipalAdministrador: async function (req, res, next) {
        res.render('administrador/PrincipalAdministrador', {
    
            
        });
    },

    getAdministrarCursos: async function(req, res, next){
        res.render('course/administrarCursos',{
            select2:true,
            prism: true,
            breadcrumb:[{
                rolUsuario:"Administrador",
                paginaAnterior:[
                    {
                        nombrePagina:"",
                        enlace:""
                    },
                    {
                        nombrePagina:"",
                        enlace:""
                    },
                    {
                        nombrePagina:"",
                        enlace:""
                    },
                ],
                paginaActual:""
            }],
            etiquetasCursos:[{
                cursosRegistrados:"154",
                cursosActivos:"54",
                cursosInactivos:"100"
            }],
        });
    },
};