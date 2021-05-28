const Controller = require('./index');

path = require('path')

module.exports = {

    getDashboardPonente: async function (req, res, next) {
        res.render('ponente/p1_dashboard', {
            ponente:true
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
    /* getAgregarTarea: async function(req, res, next){
        res.render('speaker/AgregarTarea')
    },
    postAgregarTarea: async function (req, res, next) {
        global.direccion = './archivosPrueba';
        const respuestaBD = await Controller.inserTarea(req.body, 8);
        const tareaID = respuestaBD[0][0].ID;
        const raiz = path.join(__dirname, '../../') + 'archivosPrueba/'
        let linkMultimedia = raiz.replace(/[\\]/g, '\\\\');

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