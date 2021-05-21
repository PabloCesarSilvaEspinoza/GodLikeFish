const Controller = require('./index');

path = require('path')

module.exports = {

    postDashboardPonente: async function (req, res, next) {
        res.render('ponente/p1_dashboard', {
        });
    },
    postConsultarCursoPE1: async function (req, res, next) {
        res.render('ponente/p2_consultarCursoE1_v2', {
        });
    },
    postConsultarCursoPE2: async function (req, res, next) {
        res.render('ponente/p2_consultarCursoE2_v2', {
        });
    },
    postConsultarAlumnos: async function (req, res, next) {
        res.render('ponente/p3_consultarAlumnos', {
        });
    },
    postCalificarTarea: async function (req, res, next) {
        res.render('ponente/p4_calificarTarea', {
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