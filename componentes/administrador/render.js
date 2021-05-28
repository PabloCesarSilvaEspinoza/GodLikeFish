const Controller = require('./index');
const fs = require('fs');

path = require('path')

module.exports = {

    getDashboardAdministrador: async function (req, res, next) {
        res.render('administrador/d1_dashboard_v2', {
            administrador: true
        });
    },
    getAdministrarCursos: async function (req, res, next) {
        const cursos = await Controller.listCursos();
        res.render('administrador/d2_administrarCursos', {
            administrador: true,
            datatables:true,
            dataTablesExport:true,
            cursos,
        });
    },
    
    getAdministrarUsuarios: async function (req, res, next) {
        const datosUsuarioEnSistema= await Controller.listUsuariosEnSistema(); 
        const regitrados= await Controller.listRegistrados();
        const activos= await Controller.listActivos();
        const inactivos= await Controller.listInactivos();
        const tarjetas= await Controller.listUsuariosEnSistemaTarjeta();
        const calis= await Controller.listPerfilUsuario();
        
        res.render('administrador/d3_administrarUsuarios', {
            administrador: true,
            datatables:true,
            dataTablesExport:true,
            caladon:true,
            datosUsuarioEnSistema,
            regitrados,
            activos,
            inactivos,
            tarjetas,
            calis,




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
        const fotoCurso = `${cursoID}/${req.files.fotoCurso[0].originalname}`;
        const temarioCurso = `${cursoID}/${req.files.temarioCurso[0].originalname}`;
        await Controller.insertMultimediaCurso(cursoID, temarioCurso, fotoCurso)
        res.redirect('/administrador/administrarCursos')
    },
};