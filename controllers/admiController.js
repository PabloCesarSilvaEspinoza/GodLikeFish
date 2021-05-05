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
                    cantidad,
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