const Controller = require('./index');
const fs = require('fs');

path = require('path')

module.exports = {

    getDashboardAdministrador: async function (req, res, next) {
        res.render('administrador/d1_dashboard_v2', {
            administrador: true,
            graficasAdministrador : true,
            valores:[{
            valor1: 18,
            valor2: 36,
            valor3: 10
            }]
        });
    },
    getAdministrarCursos: async function (req, res, next) {
        const cursos = await Controller.listCursos();
        const ponentes = await Controller.listPonentes();
        const areas = await Controller.listAreas();
        const fechaActual = await Controller.getTiempoActual();

        res.render('administrador/d2_administrarCursos', {
            administrador: true,
            datatables:true,
            dataTablesExport:true,
            cursos,
            ponentes,
            areas,
            fechaActual,
            graficasAdministrador : true,
            valores:[{
            valor1: 18,
            valor2: 36,
            valor3: 10
            }]
        });
    },
    
    getAdministrarUsuarios: async function (req, res, next) {
        const datosUsuarioEnSistema= await Controller.listUsuariosEnSistema(); 
        const regitrados= await Controller.listRegistrados();
        const activos= await Controller.listActivos();
        const inactivos= await Controller.listInactivos();
        const tarjetas= await Controller.listUsuariosEnSistemaTarjeta();
        const verPerfil= await Controller.listPerfilUsuario();
        
        res.render('administrador/d3_administrarUsuarios', {
            administrador: true,
            datatables:true,
            dataTablesExport:true,
            graficasAdministrador : true,
            valores:[{
            valor1: 18,
            valor2: 36,
            valor3: 10
            }],
            caladon:true,
            datosUsuarioEnSistema,
            regitrados,
            activos,
            inactivos,
            tarjetas,
            verPerfil,

        });
    },

    getConsultarCursoE1: async function (req, res, next) {
        res.render('administrador/d4_consultarCursoE1', {
            administrador: true
        });
    },

    getConsultarCursoE2: async function (req, res, next) {
        res.render('administrador/d4_consultarCursoE2', {
            administrador: true
        });
    },
    postAgregarCurso: async function (req, res, next){
        const respuestaBD = await Controller.insertCurso(req.body);
        const cursoID = respuestaBD[0][0].ID;
        const fotoCurso = `${req.files.fotoCurso[0].originalname}`;
        const temarioCurso = `${req.files.temarioCurso[0].originalname}`;
        await Controller.insertMultimediaCurso(cursoID, temarioCurso, fotoCurso)
        res.redirect('/administrador/administrarCursos')
    },
};