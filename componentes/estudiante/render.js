const student = require('./index');
const Controller = require('./index');

module.exports = {

    getDashboardAlumno: async function (req, res, next) {
        res.render('alumno/a1_dashboard', {
            estudiante:true
        });
    },
    getMisAsignaciones: async function (req, res, next) {
        res.render('alumno/a2_misAsignaciones', {
            estudiante:true
        });
    },
    getConsultarCursoE1: async function (req, res, next) {
        res.render('alumno/a3_consultarCursoE1', {
            estudiante:true
        });
    },
    getConsultarCursoE2: async function (req, res, next) {
        res.render('alumno/a3_consultarCursoE2', {
            estudiante:true,
            chartist:true,
            c3:true,
            dropzone:true
        });
    },
    getConsultarCursoE3: async function (req, res, next) {
        res.render('alumno/a3_consultarCursoE3', {
            estudiante:true
        });
    },
    getSoporte: async function (req, res, next) {
        res.render('usuario/u4_soporte', {
            estudiante:true
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