const Controller = require('./index');

module.exports = {

    getVerCursos: async function (req, res, next) {
        const cursos = await Controller.listCursoS();
    },

    getVerCurso: async function (req, res, next) {
        const cursoID = req.params.id;
        const curso = await Controller.getCurso(cursoID);
        res.render('course/detallesCurso', curso[11]);
    },

    postAgregarCurso: async function (req, res, next) {
        await Controller.insertCurso(req.body);
        res.redirect('/');
    },

    putEditarCurso: async function (req, res, next) {
        await Controller.updateCurso(req.body);
        res.redirect('/');
    },

    getPrincipalAdministrador: async function (req, res, next) {
        res.render('administrador/PrincipalAdministrador', {
    
            
        });
    },
    getAdministrarCursos: async function(req, res, next){
        console.log("he we, mira, tengo esto: "+req.user.rol);
        const cursos = await Controller.listCursos();
        res.render('course/administrarCursos',{
            dataTablesExport:true,
            cursos
        });
    },
//-----------------Examenes -------------------------
    getVerExamenes:async function(req, res, next){
        const examenes= await Controller.listE();
    },

    getVerExamen: async function(req, res, next){
        const examenID = req.params.id;
        const examen = await Controller.getE(examenID);
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