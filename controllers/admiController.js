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
    postAdministrador: async function(req, res, next){
        res.render('administrador/PrincipalAdministrador', {

        });
    },
    postDashboard: async function(req, res, next){
        res.render('administrador/dashboard',{
            tarjetasDashboard:[
                {
                    usuariosRegistrados:"",
                    reconocimientosEntregados:"",
                    cursosRegistrados:"",
                    ponentesRegistrados:""
                }
            ],
            usuariosNoVerificados:[
                {
                    cantidad:"",
                    usuario:[
                        {
                            imagen:"",
                            nombre:"",
                            Area:"",
                            Puesto:"",
                            Antiguedad:"",
                            matricula:""
                        }
                    ]
                }
            ],
            carruselCentral:[
                {
                    cursos:[
                        {
                            registrados:"",
                            activos:"",
                            inactivos:""
                        }
                    ],
                    alumnos:[
                        {
                            registrados:"",
                            certificados:"",
                            sinCertificado1:""
                        }
                    ],
                    ponentes:[
                        {
                            registrados:"",
                            activos:"",
                            inactivos:""
                        }
                    ]
                }
            ],
            reporteErrores:[
                {
                    cantidad:"",
                    reporte:[
                        {
                            imagenUsuario:"",
                            nombreUsuario:"",
                            contenidoReporte:"",
                            fechaReporte:"",
                            estado:""
                        }
                    ]
                }
            ]

        })
    }
};