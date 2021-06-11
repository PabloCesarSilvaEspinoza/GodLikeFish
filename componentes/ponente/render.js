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
        res.render('ponente/p1_dashboard', {
            ponente: true,
            cursosActuales,
            historialCursosPonente,
            totalCursosActuales,
            totalCursosHistorial,
        });
    },

    getConsultarCurso: async function (req, res, next) {
        const datosCurso = await Controller.getCurso(req.params.idCurso);
        const avisosCurso = await Controller.listAvisosUsuario(req.params.idCurso);
        const linksCurso = await Controller.listLinks(req.params.idCurso);
        const documentosCurso = await Controller.listDocumentos(req.params.idCurso);
        const curso = datosCurso[0];
        const asignacionesPonente = await Controller.listAsignacionesPonente(req.params.idCurso);
        res.render('ponente/p2_consultarCursoE1_v2', {
            ponente: true,
            curso,
            datosCurso,
            avisosCurso,
            linksCurso,
            documentosCurso,
            asignacionesPonente,
        });
    },

    getConsultarCursoPE2: async function (req, res, next) {
        res.render('ponente/p2_consultarCursoE2_v2', {
            ponente: true
        });
    },
    getConsultarAlumnos: async function (req, res, next) {
        const estudiantes = await Controller.listEstudiantes();
        const modalEstudiante = await Controller.listEstudiantes();
        res.render('ponente/p3_consultarAlumnos', {
            ponente: true,
            datatables: true,
            dataTablesExport: true,
            modalEstudiante,
            estudiantes,
        });
    },
    getCalificarTarea: async function (req, res, next) {
        res.render('ponente/p4_calificarTarea', {
            ponente: true
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
            const linkMultimedia = `${nombreMultimedia}`;
            datos = { tareaID, nombreMultimedia, linkMultimedia };
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
        //de donde se manda llamar?, para dirigirlo allí
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

    getConsultarEstadoCursoPonente: async function (req, res, next){
        const usuarioID = req.user.id;
        const cursoID = req.params.idCurso;
        const respuestaEstadoCursoPonente = await Controller.getConsultarEstadoCursoPonente(usuarioID, cursoID);
        const estadoCursoPonente = respuestaEstadoCursoPonente[0][0].Respuesta;
        const datosCurso = await Controller.getCurso(cursoID);
        const curso = datosCurso[0];

        switch (estadoCursoPonente) {
            case 'No es su curso':
            case 'Curso Inactivo':
                res.redirect('/ponente/dashboardPonente');
                break;

            case 'Curso Pasado':
                res.render('ponente/p2_consultarCursoE2_v2', {
                    ponente:true
                });
                break;

            case 'Curso Actual':
            case 'Curso Futuro':
                const avisosCurso = await Controller.listAvisosCurso(cursoID);
                const linksCurso = await Controller.listLinksCurso(cursoID);
                const documentosCurso = await Controller.listDocumentosCurso(cursoID);
                const asignacionesPonente = await Controller.listAsignacionesPonente(cursoID);
                const archivosAsignacionesPonente = await Controller.getArchivosTareaCurso(cursoID);
                const examenesCurso = await Controller.listExamenes(cursoID);
                const totalDocumentos = documentosCurso.length;
                const totalLinks = linksCurso.length;
                global.cursoActualID = cursoID;
                console.log(global.cursoActualID);
                res.render('ponente/p2_consultarCursoE1_v2', {
                    dropzone:true,
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
                });
                break;

            default: 
                console.log(estadoCursoPonente);
                res.redirect('/ponente/dashboardPonente');
                break;
        }
    },

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