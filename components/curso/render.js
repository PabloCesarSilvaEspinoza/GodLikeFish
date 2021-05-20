const Controller = require('./index');

module.exports = {

    getVerCursos: async function (req, res, next) {
        const courses = await Controller.list(); //-------
    },

    getVerCurso: async function (req, res, next) {
        const id = req.params.id;
        const course = await Controller.get(id); //-----
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

    getPrincipalAdministrador: async function (req, res, next) {
        res.render('administrador/PrincipalAdministrador', {
    
            
        });
    },
    getAdministrarCursos: async function(req, res, next){
        const courses = await Controller.list();
        res.render('course/administrarCursos',{
            dataTablesExport:true,
            courses
        });
    },
//-----------------Examenes -------------------------
    getVerExamenes:async function(req, res, next){
        const courses= await Controller.listE(); //---
    },

    getVerExamen: async function(req, res, next){
        const id = req.params.id;
        const course = await Controller.getE(id); //---
        res.redirect('/');
    },

    postAgregarExamen: async function(req, res, next){
        await Controller.insertE(req.body);
       res.redirect('/');
    },

    putEditarExamen: async function(req, res, next){
        await Controller.updateE(req.body);
       res.redirect('/');
    },
};