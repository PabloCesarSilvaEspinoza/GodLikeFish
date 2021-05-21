const Controller = require('./index');
const fs = require('fs');

path = require('path')

module.exports = {

    postDashboardAdministrador: async function (req, res, next) {
        res.render('administrador/d1_dashboard_v2', {
        });
    },
    postAdministrarCursos: async function (req, res, next) {
        res.render('administrador/d2_administrarCursos', {
        });
    },
    
    postAdministrarUsuarios: async function (req, res, next) {
        res.render('administrador/d3_administrarUsuarios', {
        });
    },

    postConsultarCursoE1: async function (req, res, next) {
        res.render('administrador/d4_consultarCursoE1', {
        });
    },

    postConsultarCursoE2: async function (req, res, next) {
        res.render('administrador/d4_consultarCursoE2', {
        });
    },
    /*getAdministrarCursos: async function(req, res, next){
        const cursos = await Controller.listCursos();
        res.render('course/administrarCursos',{
            dataTablesExport:true,
            cursos
        });
    },
    postAgregarCurso: async function (req, res, next){
        const respuestaBD = await Controller.insertCurso(req.body);
        const cursoID = respuestaBD[0][0].ID;
        const fotoCurso = `${cursoID}/${req.files.fotoCurso[0].originalname}`;
        const temarioCurso = `${cursoID}/${req.files.temarioCurso[0].originalname}`;
        await Controller.insertMultimediaCurso(cursoID, temarioCurso, fotoCurso)
        res.redirect('/admin/administrarCursos')
    }, */
};