const student = require('./index');
const Controller = require('./index');

module.exports = {

    postDashboardAlumno: async function (req, res, next) {
        res.render('alumno/a1_dashboard', {
        });
    },
    postMisAsignaciones: async function (req, res, next) {
        res.render('alumno/a2_misAsignaciones', {
        });
    },
    postConsultarCursoE1: async function (req, res, next) {
        res.render('alumno/a3_consultarCursoE1', {
        });
    },
    postConsultarCursoE2: async function (req, res, next) {
        res.render('alumno/a3_consultarCursoE2', {
        });
    },
    postConsultarCursoE3: async function (req, res, next) {
        res.render('alumno/a3_consultarCursoE3', {
        });
    },

    /* getVerTareas:async function(req, res, next){
        const cursos= await Controller.list();
     },

    getVerTarea: async function(req, res, next){
        const id = req.params.id;
        const curso = await Controller.get(id);
        res.redirect('/');
    },

    postAgregarTarea: async function(req, res, next){
        await Controller.insert(req.body);
       res.redirect('/');
    },

    putEditarTarea: async function(req, res, next){
        await Controller.update(req.body);
       res.redirect('/');
    }, */

};