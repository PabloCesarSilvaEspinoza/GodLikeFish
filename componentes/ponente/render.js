const { Console } = require('console');
const Controller = require('./index');

path = require('path')

module.exports = {

    getDashboardPonente: async function (req, res, next) {
        const usuarioID = (req.user.id);
        const cursosActuales = await Controller.listCursosActuales(usuarioID);
        const historialCursosPonente = await Controller.getHistorialCursosPonente(usuarioID);
        const totalCursosActuales = cursosActuales.length;
        const totalCursosHistorial = historialCursosPonente.length;
        const respuestaDatosGeneralesPonente = await Controller.catalogDatosGeneralesPonente(usuarioID);
        const datosGeneralesPonente = respuestaDatosGeneralesPonente[0];
        const nombresCursosActualesPonente = await Controller.getNombresCursosActualesPonente(usuarioID);
        const fechaActual = await Controller.getTiempoActual();
        const miPerfil = await Controller.getMiPerfil(usuarioID);
        const asignacionesPendientes = await Controller.listAsignacionesPendientesPonente(usuarioID);
        const mensaje = await Controller.getMensajeBienvenida();
        res.render('ponente/p1_dashboard', {
            ponente: true,
            graficasPonente: true,
            cursosActuales,
            historialCursosPonente,
            totalCursosActuales,
            totalCursosHistorial,
            datosGeneralesPonente,
            nombresCursosActualesPonente,
            fechaActual,
            miPerfil,
            asignacionesPendientes,
            mensaje
        });
    },
    
    getConsultarAlumnos: async function (req, res, next) {
        const cursoID = req.params.idCurso;
        const estudiantesInscritos = await Controller.listEstudiantesInscritos(cursoID);
        const miPerfil = await Controller.getMiPerfil(req.user.id);
        const respuestaEstadoCurso = await Controller.getEstadoCurso(cursoID)
        const estadoCurso = respuestaEstadoCurso[0];
        console.log(estadoCurso.cursoAbierto);
        res.render('ponente/p3_consultarAlumnos', {
            ponente: true,
            dataTables: true,
            dataTablesExport: true,
            estudiantesInscritos,
            miPerfil,
            estadoCurso
        });
    },
    getCalificarTarea: async function (req, res, next) {
        const tareaID = req.params.idTarea;
        const estadoEntregasTarea = await Controller.listEstadoEntregasTarea(tareaID);
        const archivosEntregasTarea = await Controller.listArchivosEntregasTarea(tareaID);
        const datosTarea = await Controller.getDatosTarea(tareaID);
        const miPerfil = await Controller.getMiPerfil(req.user.id);
        res.render('ponente/p4_calificarTarea', {
            ponente: true,
            dataTables: true,
            estadoEntregasTarea,
            archivosEntregasTarea,
            datosTarea,
            miPerfil
        });
    },
    getSoporte: async function (req, res, next) {
        res.render('usuario/u4_soporte', {
            ponente: true
        });
    },
    postAgregarExamen: async function (req, res, next) {
        await Controller.insertExamen(req.body);
        res.redirect('back');
    },

    postAgregarTarea: async function (req, res, next) {
        const respuestaBD = await Controller.insertTarea(req.body);
        const tareaID = respuestaBD[0][0].ID;
        for (const file of req.files) {
            const nombreMultimedia = file.originalname;
            datos = { tareaID, nombreMultimedia };
            await Controller.insertMultimediaTarea(datos);
        }
        res.redirect('back')
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

    postReportarProblemaUsuario: async function (req, res, next) {
        await Controller.reportarProblemaUsuario(
            req.user.id,
            //el resto de datos los leemos del modal
            req.body.asuntoProblema,
            req.body.descripcionProblema
        );
        res.redirect('/soporte');
    },

    postAgregarAviso: async function (req, res, next) {
        await Controller.insertAviso(req.body);
        res.redirect('back');
    },

    postAgregarEnlace: async function (req, res, next) {
        await Controller.insertEnlace(req.body);
        res.redirect('back');
    },

    getDescargarArchivoTarea: async function (req, res, next) {
        console.log('hola');
        const tareaID = req.params.idTarea;
        const archivoNombre = req.params.nombreArchivo;
        const raiz = path.join(__dirname, '../../public/assets/multimedia/tareas');
        const archivoRuta = `${raiz}/${tareaID}/${archivoNombre}`;
        res.download(archivoRuta)
    },

    postAgregarArchivos: async function (req, res, next) {
        for (const file of req.files) {
            await Controller.insertArchivosMultimediaCurso(req.body.idCurso, file.originalname);
        }
        res.redirect('back')
    },

    getDescargarArchivoCurso: async function (req, res, next) {
        const cursoID = req.params.idCurso;
        const archivoNombre = req.params.nombreArchivo;
        const raiz = path.join(__dirname, '../../public/assets/multimedia/cursos');
        const archivoRuta = `${raiz}/${cursoID}/${archivoNombre}`;
        res.download(archivoRuta)
    },

    postCalificarEntrega: async function (req, res, next) {
        const { idEstudiante, idTarea, aceptable } = req.body;
        await Controller.upsertCalificarTarea(idEstudiante, idTarea, aceptable);
        res.redirect(`/ponente/CalificarTarea/${req.body.idTarea}`)
    },

    postTerminarCalificarTarea: async function (req, res, next) {
        const tareaID = req.body.idTarea;
        const tareas = await Controller.listEstadoEntregasTarea(tareaID);
        for(tarea of tareas){
            if(tarea.estadoRevision == 'SinRevisar'){
                await Controller.upsertCalificarTarea(tarea.idEstudiante, tareaID, 0);
            }
        }
        res.redirect(`/ponente/CalificarTarea/${req.body.idTarea}`)
    },

    putEditarExamen: async function (req, res, next) {
        await Controller.upsertDatosExamen(req.params.id, req.body);      
        res.redirect('back');

    },
    postDeleteExamen: async function (req, res, next) {
        await Controller.deleteExamen(req.params.idExamen);     
    res.redirect('back');
    },

    putEditarAviso: async function (req, res, next) {
        await Controller.upsertDatosAviso(req.params.id, req.body);      
        res.redirect('back');
    },

    postDeleteAviso: async function (req, res, next) {
        await Controller.deleteAvisos(req.params.idAviso);     
        res.redirect('back');
    },

    postDeleteDocumento: async function (req, res, next) {
        await Controller.deleteDocumentos(req.params.idDocumento);     
        res.redirect('back');
    },

    putEditarLinks: async function (req, res, next) {
        await Controller.upsertDatosLinks(req.params.id, req.body);      
        res.redirect('back');
    },

    postDeleteLink: async function (req, res, next) {
        await Controller.deleteLinks(req.params.idLink);     
        res.redirect('back');
    },

    putEditarAsignacion: async function (req, res, next) {
        console.log(req.params.id);
        await Controller.upsertDatosTarea(req.params.id, req.body);   
        // const temario = `${req.file.originalname}`;
        //  await Controller.insertArchivosMultimediaCurso(req.body.idCurso, temario);
        res.redirect('back');
    },

    postDeleteAsignacion: async function (req, res, next) {
        await Controller.deleteTarea(req.params.idTarea);     
        res.redirect('back');
    },

    postCalificarEstudiante: async function(req, res, next){
        await Controller.upsertCalificarEstudiante(req.body);
        res.redirect('back');
    },

    getDescargarTemario: async function (req, res, next) {
        const curso = await Controller.getTemario(req.params.idCurso);
        const temario = curso[0].cursoTemario;
        const raiz = path.join(__dirname, '../../public/assets/multimedia/cursos');
        const archivo = `${raiz}/${req.params.idCurso}/${temario}`;
        res.download(archivo)
    },

    getDescargarArchivoEntrega: async function (req, res, next) {
        const estudianteID = req.params.idEstudiante;
        const nombreArchivo = req.params.nombreArchivo;
        const idTarea = req.params.idTarea;
        const raiz = path.join(__dirname, '../../public/assets/multimedia/tareas_estudiantes');
        const archivoRuta = `${raiz}/${estudianteID}/${idTarea}/${nombreArchivo}`;
        res.download(archivoRuta)
    },

    getConsultarEstadoCursoPonente: async function (req, res, next){
        console.log('entre')
        const usuarioID = req.user.id;
        const cursoID = req.params.idCurso;
        const respuestaEstadoCursoPonente = await Controller.getConsultarEstadoCursoPonente(usuarioID, cursoID);
        const estadoCursoPonente = respuestaEstadoCursoPonente[0][0].Respuesta;
        const datosCurso = await Controller.getCurso(cursoID);
        const curso = datosCurso[0];
        const miPerfil = await Controller.getMiPerfil(usuarioID);
        console.log(estadoCursoPonente);
        const verPerfilPonente = await Controller.getPerfilPonente(cursoID);
        const perfilPonente = verPerfilPonente[0];
        if(estadoCursoPonente == 'Curso Pasado' || estadoCursoPonente == 'Curso Actual' || estadoCursoPonente == 'Curso Futuro'){
            var avisosCurso = await Controller.listAvisosCurso(cursoID);
            var linksCurso = await Controller.listLinksCurso(cursoID);
            var documentosCurso = await Controller.listDocumentosCurso(cursoID);
            var asignacionesPonente = await Controller.listAsignacionesPonente(cursoID);
            var asignacionesPonenteEditar= await Controller.listAsignacionesPonenteEditar(cursoID);
            var archivosAsignacionesPonente = await Controller.getArchivosTareaCurso(cursoID);
            var examenesCurso = await Controller.listExamenesCurso(cursoID);
            var publicacionesCurso = await Controller.listPublicacionesCurso(cursoID);
            var totalDocumentos = documentosCurso.length;
            var totalLinks = linksCurso.length;
            var fechaActual = await Controller.getTiempoActual();
            global.cursoActualID = cursoID;
            var examenesCursoE = await await Controller.listExamen(cursoID);
        }
        switch (estadoCursoPonente) {
            case 'No es su curso':
            case 'Curso Inactivo':
                res.redirect('/ponente/dashboardPonente');
                break;

            case 'Curso Pasado':
                res.render('ponente/p2_consultarCursoE2', {
                    ponente: true,
                    curso,
                    datosCurso,
                    avisosCurso,
                    linksCurso,
                    documentosCurso,
                    asignacionesPonente,
                    totalDocumentos,
                    totalLinks,
                    examenesCurso,
                    archivosAsignacionesPonente,
                    publicacionesCurso,
                    fechaActual,
                    miPerfil,
                    examenesCursoE,
                    asignacionesPonenteEditar,
                    perfilPonente
                });
                break;

            case 'Curso Actual':
            case 'Curso Futuro':
                res.render('ponente/p2_consultarCursoE1', {
                    ponente: true,
                    curso,
                    datosCurso,
                    avisosCurso,
                    linksCurso,
                    documentosCurso,
                    asignacionesPonente,
                    totalDocumentos,
                    totalLinks,
                    examenesCurso,
                    archivosAsignacionesPonente,
                    publicacionesCurso,
                    fechaActual,
                    miPerfil,
                    examenesCursoE,
                    asignacionesPonenteEditar,
                    perfilPonente
                });
                break;

            default: 
                console.log(estadoCursoPonente);
                res.redirect('/ponente/dashboardPonente');
                break;
        }
    },

    getConsultarCursos: async function(req, res, next){
        const usuarioID = (req.user.id);
        const miPerfil = await Controller.getMiPerfil(req.user.id);
        const historialCursosPonente = await Controller.getHistorialCursosPonente(usuarioID);
        res.render('ponente/p5_misCursos',{
            ponente: true,
            dataTables: true,
            miPerfil,
            historialCursosPonente,
            miPerfil,
            /* datos del usuario */
        })
    }


    /* getAgregarTarea: async function(req, res, next){
        res.render('speaker/AgregarTarea')
    },
    

        for (const file of req.files) {
            const nombreMultimedia = file.originalname;
            const tipoMultimedia = file.mimetype;
            linkMultimedia += nombreMultimedia;
            datos = {tareaID, nombreMultimedia, linkMultimedia, tipoMultimedia};
            await Controller.inserTareaMultimedia(datos);
        }

        res.redirect('http://localhost:3000/ponente/AgregarTareaPrueba')
    },
    getDescargarArchivos: async function (req, res, next) {
        const raiz = path.join(__dirname, '../../');
        const archivo = 'Actividad 2 S4.1.png';
        const direccion = `${raiz}archivosPrueba/${archivo}`

        res.download(`${direccion}`)
    }, */
};