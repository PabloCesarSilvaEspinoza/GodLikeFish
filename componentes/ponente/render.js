const { Console } = require('console');
const Controller = require('./index');

path = require('path')

module.exports = {

    getDashboardPonente: async function (req, res, next) {
        const usuarioID = (req.user.id);
        const cursosActivos = await Controller.listCursosActivos(usuarioID);
        const respuestaProximoCurso = await Controller.getProximoCurso(req.user.id);
        const proximoCurso = respuestaProximoCurso[0];
        res.render('ponente/p1_dashboard', {
            ponente:true,
            cursosActivos,
            proximoCurso
        });
    },
    getConsultarCursoPE1: async function (req, res, next) {
        res.render('ponente/p2_consultarCursoE1_v2', {
            ponente:true
        });
    },
    getConsultarCursoPE2: async function (req, res, next) {
        res.render('ponente/p2_consultarCursoE2_v2', {
            ponente:true
        });
    },
    getConsultarAlumnos: async function (req, res, next) {
        const alumnos = await Controller.listAlumnos();
        const cursos = await Controller.listCursos();
        res.render('ponente/p3_consultarAlumnos', {
            ponente:true,
            datatables:true,
            dataTablesExport:true,
            cursos,
            alumnos,
        });
    },
    getCalificarTarea: async function (req, res, next) {
        res.render('ponente/p4_calificarTarea', {
            ponente:true
        });
    },
    getSoporte: async function (req, res, next) {
        res.render('usuario/u4_soporte', {
            ponente:true
        });
    },

    postAgregarTarea: async function (req, res, next) {
        const respuestaBD = await Controller.insertTarea(req.body);
        const tareaID = respuestaBD[0][0].ID;
        for (const file of req.files) {
            const nombreMultimedia = file.originalname;
            const linkMultimedia = `${tareaID}\\\\${nombreMultimedia}`;
            datos = {tareaID, nombreMultimedia, linkMultimedia};
            await Controller.insertMultimediaTarea(datos);
        }
        res.redirect('/ponente/consultarCursoPEI')
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