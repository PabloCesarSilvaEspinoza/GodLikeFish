const { insertReporte } = require('./index');
const Controller = require('./index');


module.exports = {

    getDashboardAlumno: async function (req, res, next) {
        const usuarioID = req.user.id;
        const miPerfil = await Controller.getMiPerfil(req.user.id);
        const respuestaCursosDisponibles = await Controller.listCursosDisponibles(usuarioID);
        const cursosDisponibles = respuestaCursosDisponibles[0];
        const totalCursos = cursosDisponibles.length;
        const historialCursos = await Controller.getHistorialCursosEstudiante(usuarioID);
        const totalHistorialCursos = historialCursos.length;
        const cursoActualEstudiante = await Controller.getCursoActual(usuarioID);
        const respuestaPosiblesCursosEstudiante = await Controller.catalogPosiblesCursosEstudiante(usuarioID);
        const posiblesCursosEstudiante = respuestaPosiblesCursosEstudiante[0];
        const respuestaResumenEstudiante = await Controller.catalogResumenEstudiante(usuarioID);
        const resumenEstudiante = respuestaResumenEstudiante[0];
        const mensaje = await Controller.getMensajeBienvenida();
        res.render('alumno/a1_dashboard', {
            estudiante:true,
            graficasEstudiante: true,
            miPerfil,
            cursosDisponibles,
            totalCursos,
            historialCursos,
            totalHistorialCursos,
            cursoActualEstudiante,
            posiblesCursosEstudiante,
            resumenEstudiante,
            mensaje
        });
    },
    getMisAsignaciones: async function (req, res, next) {
        const usuarioID = req.user.id;
        const respuestaAsignacionesTotalesEstudiante = await Controller.catalogAsignacionesTotalesEstudiante(usuarioID)
        const asignacionesTotalesEstudiante = respuestaAsignacionesTotalesEstudiante[0];
        const respuestaArchivosAsignacionesTotales = await Controller.catalogArchivosAsignacionesTotales(usuarioID);
        const archivosAsignacionesTotales = respuestaArchivosAsignacionesTotales[0];
        const archivosEntregasTotalesEstudiante = await Controller.listArchivosEntregasTotalesEstudiante(usuarioID);
        const miPerfil = await Controller.getMiPerfil(req.user.id);
        res.render('alumno/a2_misAsignaciones', {
            estudiante:true,
            asignacionesTotalesEstudiante,
            archivosAsignacionesTotales,
            archivosEntregasTotalesEstudiante,
            miPerfil
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
        await Controller.insertEstudianteCurso(req.user.id, req.body.idCurso);
        res.redirect('/estudiante/dashboardEstudiante');
    },
    
    postCalificarExperiencia: async function (req, res, next){
        console.log(req.user.id);
        console.log(req.params.idCurso);
        const respuestaBD = await Controller.insertCalificarExperiencia(req.user.id, req.params.idCurso, req.body);
        console.log(respuestaBD);
        res.redirect('/alumno/a3_consultarCursoE3');
    },

    getDescargarArchivoTarea: async function (req, res, next) {
        const tareaID = req.params.idTarea;
        const archivoNombre = req.params.nombreArchivo;
        const raiz = path.join(__dirname, '../../public/assets/multimedia/tareas');
        const archivoRuta = `${raiz}/${tareaID}/${archivoNombre}`;
        res.download(archivoRuta)
    },

    getDescargarArchivoCurso: async function (req, res, next) {
        const cursoID = req.params.idCurso;
        const archivoNombre = req.params.nombreArchivo;
        const raiz = path.join(__dirname, '../../public/assets/multimedia/cursos');
        const archivoRuta = `${raiz}/${cursoID}/${archivoNombre}`;
        res.download(archivoRuta)
    },

    postEntregarTarea: async function(req, res, next){
        const respuestaTareaEstudiante = await Controller.insertTareaEstudiante(req.user.id, req.params.idTarea);
        const entregaID = respuestaTareaEstudiante[0][0].ID;
        for (const file of req.files) {
            const nombreMultimediaEstudiante = file.originalname;
            await Controller.insertMultimediaTareaEstudiante(entregaID, nombreMultimediaEstudiante);
        }
        res.redirect('back');
    },

    getDescargarArchivoEntregado: async function (req, res, next) {
        const usuarioID = req.user.id;
        const nombreArchivo = req.params.nombreArchivo;
        const idTarea = req.params.idTarea;
        const raiz = path.join(__dirname, '../../public/assets/multimedia/tareas_estudiantes');
        const archivoRuta = `${raiz}/${usuarioID}/${idTarea}/${nombreArchivo}`;
        res.download(archivoRuta)
    },

    getCatalogoCursos: async function (req, res, next) {
        const respuestaCatalogoCursosEstudiante = await Controller.catalogCatalogoCursosEstudiante(req.user.id);
        const catalogoCursosEstudiante = respuestaCatalogoCursosEstudiante[0];
        const miPerfil = await Controller.getMiPerfil(req.user.id);
        res.render('alumno/a5_catalogoCursos', {
            estudiante: true,
            dataTables: true,
            catalogoCursosEstudiante,
            miPerfil
        })
    },

    postVerificarClaveCurso: async function (req, res, next) {
        const { claveCursoEnviada } = req.body;
        let claveEncontrada = false;
        const clavesCursos = await Controller.listClavesCursos();
        for(curso of clavesCursos){
            if (claveCursoEnviada == curso.claveCurso){
                claveEncontrada = true;
                res.redirect(`/estudiante/curso/${curso.idCurso}`)
            }
        }
        if (!claveEncontrada){
            res.redirect(`/estudiante/dashboardEstudiante`)
        }
    },

    postReportarProblemaCurso: async function (req, res, next) {
        await Controller.reportarProblemaCurso(
            req.user.id,
            req.body.idCurso,
            req.body.asuntoProblema,
            req.body.descripcionProblema
        );
        res.redirect('back')
    },


    getConsultarEstadoCursoEstudiante: async function (req, res, next){
        const usuarioID = req.user.id;
        const cursoID = req.params.idCurso;
        const respuestaEstadoCursoEstudiante = await Controller.getConsultarEstadoCursoEstudiante(usuarioID, cursoID);
        const estadoCursoEstudiante = respuestaEstadoCursoEstudiante[0][0].Respuesta;
        const datosCurso = await Controller.getCursoInscripcion(cursoID);
        const curso = datosCurso[0];
        const miPerfil = await Controller.getMiPerfil(req.user.id);
        const verPerfilPonente = await Controller.getPerfilPonente(cursoID);
        const perfilPonente = verPerfilPonente[0];

        if(estadoCursoEstudiante == 'Curso Futuro' || estadoCursoEstudiante == 'Curso Actual' || estadoCursoEstudiante == 'Curso Pasado'){
            var avisosCurso = await Controller.listAvisosUsuario(cursoID);
            var documentosCurso = await Controller.listDocumentos(cursoID);
            var linksCurso = await Controller.listLinks(cursoID); 
            var respuestaAsignacionesEstudiante = await Controller.listAsignacionesEstudiante(usuarioID, cursoID);
            var asignacionesEstudiante = respuestaAsignacionesEstudiante[0];
            var archivosEntregasEstudiante = await Controller.listArchivosEntregasTotalesEstudiante(usuarioID);
            var archivosAsignaciones = await Controller.listArchivosTareaCurso(cursoID);
            var examenesCurso = await Controller.listExamenes(cursoID);
            var respuestaPublicacionesCursoEstudiante = await Controller.catalogPublicacionesCursoEstudiante(usuarioID, cursoID);
            var publicacionesCursoEstudiante = respuestaPublicacionesCursoEstudiante[0];
            var totalDocumentos = documentosCurso.length;
            var totalLinks = linksCurso.length;
        }
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
                    miPerfil,
                    perfilPonente
                });
                break;

            case 'Curso Pasado':
                res.render('alumno/a3_consultarCursoE3', {
                    estudiante:true,
                    alerta: true,
                    curso,
                    avisosCurso,
                    documentosCurso,
                    linksCurso,
                    asignacionesEstudiante,
                    examenesCurso,
                    totalDocumentos,
                    totalLinks,
                    archivosAsignaciones,
                    publicacionesCursoEstudiante,
                    archivosEntregasEstudiante,
                    usuarioID,
                    miPerfil,
                    perfilPonente
                });
                break;

            case 'Curso Actual':
            case 'Curso Futuro':
                res.render('alumno/a3_consultarCursoE2', {
                    estudiante:true,
                    alerta: true,
                    curso,
                    avisosCurso,
                    documentosCurso,
                    linksCurso,
                    asignacionesEstudiante,
                    examenesCurso,
                    totalDocumentos,
                    totalLinks,
                    archivosAsignaciones,
                    publicacionesCursoEstudiante,
                    archivosEntregasEstudiante,
                    usuarioID,
                    miPerfil,
                    perfilPonente
                });
                break;
        
            default: 
                res.redirect('/estudiante/dashboardEstudiante');
                break;
        }
    },
    
    postReportarProblemaUsuario: async function (req, res, next) {
        console.log(req.body);
        await Controller.insertReportarProblema(
            req.user.id,
            req.body.asuntoProblema,
            req.body.descripcionProblema
        );
        res.redirect('/soporte/')
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