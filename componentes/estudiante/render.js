const Controller = require('./index');


module.exports = {

    getDashboardAlumno: async function (req, res, next) {
        const miPerfil = await Controller.getMiPerfil(req.user.id);
        const datosUsuario = await Controller.getUsuarioArea(req.user.id);
        const areaUsuario = datosUsuario[0].areaUsuario;
        const respuestaBD = await Controller.listCursosDisponibles(req.user.id);
        const cursosDisponibles = respuestaBD[0];
        const totalCursos = cursosDisponibles.length;
        const historialCursos = await Controller.getHistorialCursosEstudiante(req.user.id);
        const totalHistorialCursos = historialCursos.length;

        res.render('alumno/a1_dashboard', {
            estudiante:true,
            miPerfil,
            cursosDisponibles,
            totalCursos,
            historialCursos,
            totalHistorialCursos,
        });
    },
    getMisAsignaciones: async function (req, res, next) {
        res.render('alumno/a2_misAsignaciones', {
            estudiante:true
        }); 
    },
    getConsultarCurso: async function (req, res, next) {
        //Si no esta inscrito
        const datosCurso = await Controller.getCursoInscripcion(req.params.idCurso);
        const curso = datosCurso[0];
        res.render('alumno/a3_consultarCursoE1', {
            estudiante:true,
            curso,
        });
    },
    getConsultarCursoE2: async function (req, res, next) {
       // const usuarioID = (req.user.id);
        const usuarioID = (29);
        const datosCursoUsuario= await Controller.listDatosCursoUsuario(usuarioID); 
        const AvisosUsuario = await Controller.listAvisosUsuario(usuarioID); 
        const documentosCurso = await Controller.listDocumentos(req.params.idCurso);
        const linksCurso = await Controller.listLinks(req.params.idCurso); 

        // console.log(datosCursoUsuario);
        // console.log(AvisosUsuario);
        // console.log(RecursosUsuarioDocumentos);
        // console.log(RecursosUsuarioLinks);

        const RecursosUsuarioDocumentos= await Controller.listRecursosUsuarioDocumentos(usuarioID); 
        const RecursosUsuarioLinks= await Controller.listRecursosUsuarioLinks(usuarioID);
        res.render('alumno/a3_consultarCursoE2', {
            estudiante:true,
            chartist:true,
            c3:true,
            dropzone:true,
            dataTables: true,
            alerta: true,
            select2: true,
            datosCursoUsuario,
            AvisosUsuario,
            documentosCurso,
            linksCurso,

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

    getDescargarTemario: async function (req, res, next) {
        const curso = await Controller.getTemario(req.params.idCurso);
        const temario = curso[0].cursoTemario;
        const raiz = path.join(__dirname, '../../public/assets/multimedia/cursos');
        const archivo = `${raiz}/${req.params.idCurso}/${temario}`;
        res.download(archivo)
    },

    postInscribirse: async function (req, res, next){
        console.log(req.user.id);
        console.log(req.body.idCurso);
        const respuestaBD = await Controller.insertEstudianteCurso(req.user.id, req.body.idCurso);
        console.log(respuestaBD);
        res.redirect('/estudiante/dashboardEstudiante');
    }

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