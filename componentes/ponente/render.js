const { Console } = require('console');
const Controller = require('./index');

path = require('path')

module.exports = {

    getDashboardPonente: async function (req, res, next) {
        const usuarioID = (req.user.id);
        // const cursosActivos = await Controller.listCursosActuales(usuarioID);
        // const usuarioID = 1;
        // const cursosActivos= await Controller.listCursosActivos(usuarioID); 
        const HistorialCursosPonente = await Controller.getHistorialCursosPonente(req.user.id);
        const cursosHistorial = HistorialCursosPonente.length
        // const cursosActuales = cursosActivos.length
        res.render('ponente/p1_dashboard', {
            ponente: true,
            // cursosActivos,
            HistorialCursosPonente,
            cursosHistorial,
            // cursosActuales,
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
        res.redirect('/ponente/consultarCursoPEI')
    },

    postAgregarTarea: async function (req, res, next) {
        const respuestaBD = await Controller.insertTarea(req.body);
        const tareaID = respuestaBD[0][0].ID;
        for (const file of req.files) {
            const nombreMultimedia = file.originalname;
            const linkMultimedia = `${tareaID}\\\\${nombreMultimedia}`;
            datos = { tareaID, nombreMultimedia, linkMultimedia };
            await Controller.insertMultimediaTarea(datos);
        }
        res.redirect('/ponente/consultarCursoPEI')
    },

    postReportarProblemaCurso: async function (req, res, next) {
        await Controller.reportarProblemaCurso(
            req.user.id,
            req.body.idCurso,
            req.body.asuntoProblema,
            req.body.descripcionProblema
        );
        res.redirect('/ponente/curso/'+req.body.idCurso);
    },

    postReportarProblemaUsuario: async function (req, res, next) {
        await Controller.reportarProblemaUsuario(
            req.user.id,
            //el resto de datos los leemos del modal
            req.body.asuntoProblema,
            req.body.descripcionProblema
        );
        //de donde se manda llamar?, para dirigirlo allí
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