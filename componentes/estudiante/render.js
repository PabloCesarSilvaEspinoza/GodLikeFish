const Controller = require('./index');


module.exports = {

    getDashboardAlumno: async function (req, res, next) {
        const miPerfil = await Controller.getMiPerfil(req.user.id);
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

    getConsultarCursoE2: async function (req, res, next) {
        const usuarioID = (req.user.id);
        // const usuarioID = (4);
        const datosCursoUsuario= await Controller.listDatosCursoUsuario(25); 
        const AvisosUsuario = await Controller.listAvisosUsuario(39); 
        const documentosCurso = await Controller.listDocumentos(40);
        const linksCurso = await Controller.listLinks(40); 
        const asignacionesEstudiante = await Controller.listAsignacionesEstudiante(43);
        const examenesCurso = await Controller.listExamenes(35);

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
            examenesCurso,
            asignacionesEstudiante,

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
        const respuestainsertEstudianteCurso = await Controller.insertEstudianteCurso(req.user.id, req.body.idCurso);
        const estadoInscripcion = respuestainsertEstudianteCurso[0][0].Respuesta;
        console.log(estadoInscripcion);
        res.redirect('/estudiante/dashboardEstudiante');
    },
    
    getConsultarEstadoCursoEstudiante: async function (req, res, next){
        const usuarioID = req.user.id;
        const cursoID = req.params.idCurso;
        const respuestaEstadoCursoEstudiante = await Controller.getConsultarEstadoCursoEstudiante(usuarioID, cursoID);
        const estadoCursoEstudiante = respuestaEstadoCursoEstudiante[0][0].Respuesta;
        const datosCurso = await Controller.getCursoInscripcion(cursoID);
        const curso = datosCurso[0];

        switch (estadoCursoEstudiante) {
            case 'Diferentes areas':
            case 'Curso Inactivo':
                res.redirect('/estudiante/dashboardEstudiante');
                break;

            case 'Inscripcion':
            case 'Inscripcion Cerrada':
                res.render('alumno/a3_consultarCursoE1', {
                    estudiante:true,
                    curso,
                });
                break;

            case 'Curso Pasado':
                res.render('alumno/a3_consultarCursoE3', {
                    estudiante:true
                });
                break;

            case 'Curso Actual':
            case 'Curso Futuro':
                const documentosCurso = await Controller.listDocumentos(cursoID);
                const linksCurso = await Controller.listLinks(cursoID); 
                const asignacionesEstudiante = await Controller.listAsignacionesEstudiante(cursoID);
                const examenesCurso = await Controller.listExamenes(cursoID);
                res.render('alumno/a3_consultarCursoE2', {
                    estudiante:true,
                    chartist:true,
                    c3:true,
                    dropzone:true,
                    dataTables: true,
                    alerta: true,
                    select2: true,
                    curso,
                    documentosCurso,
                    linksCurso,
                    examenesCurso,
                    asignacionesEstudiante,
                });
                break;
        
            default: 
                res.redirect('/estudiante/dashboardEstudiante');
                break;
        }
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