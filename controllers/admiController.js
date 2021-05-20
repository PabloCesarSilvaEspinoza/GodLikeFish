const Controller = require('../componentes/usuario/index');
module.exports = {

    postEjemplo: async function(req, res, next){
        const users = await Controller.list();

        console.log(users[0]);
        res.render('administrador/ejemplo', users);
    },
    postAdministradorPonentes: async function(req, res, next){
        const users = await Controller.list();
        res.render('administrador/PrincipalAdministrador-Ponentes', {
            users,
            dataTablesExport: true,
            
            etiquetasPonentes:[{
                ponentesRegistrados:"86",
                ponentesConCurso:"78",
                ponentesSinCurso:"8"
            }],
            datosResumenPonentes:[{
                resumenRegistrados:"90",
                resumenActivos:"34",
                resumenInactivos:"90"
            }],
            graficas: [{
                numeroUsuarios: "34",
                fechaActual: "07/02/2021",
                numeroCategorias: "250"

            }],
            miPerfilDatoEstatico:[{
                matricula: "33333333",
                puesto: "Doctor",
                area:"Cirujano",
                edad: "34",
                nombres: "Rocio Rosales",
                pApellido:"Rosales",
                sApellido:"Arroyo",
                tipo:"Ponente",
                matricula:"125458653",
                municipioResidenciaID:"Morelia",
                colonia:"Hidalgo",
                calle:"Sin describir",
                numeroExt:"255",
                numeroInt:"33"
            }]            

        });
    },
    
    postDashboard: async function(req, res, next){
        const users = await Controller.list();
        res.render('administrador/dashboard', {
            users,
            dataTablesExport: true})
    }
};