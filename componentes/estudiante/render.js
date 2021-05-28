const student = require('./index');
const Controller = require('./index');


module.exports = {

    getDashboardAlumno: async function (req, res, next) {
        const miPerfil = await Controller.getMiPerfil(req.user.id);
        res.render('alumno/a1_dashboard', {
            estudiante:true,
            miPerfil,
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
        //const usuarioID = (req.user.id);
        const usuarioID = (29);
        const datosCursoUsuario= await Controller.listDatosCursoUsuario(usuarioID); 
        const AnunciosUsuario = await Controller.listAnunciosUsuario(usuarioID); 
        const RecursosUsuarioDocumentos= await Controller.listRecursosUsuarioDocumentos(usuarioID); 
        const RecursosUsuarioLinks= await Controller.listRecursosUsuarioLinks(usuarioID); 

        console.log(datosCursoUsuario);
        console.log(AnunciosUsuario);
        console.log(RecursosUsuarioDocumentos);
        console.log(RecursosUsuarioLinks);

        res.render('alumno/a3_consultarCursoE2', {
            estudiante:true,
            chartist:true,
            c3:true,
            dropzone:true,
            dataTables: true,
            alerta: true,
            select2: true,
            datosCursoUsuario,
            AnunciosUsuario,
            RecursosUsuarioDocumentos,
            RecursosUsuarioLinks,

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