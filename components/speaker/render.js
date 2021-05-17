const Controller = require('./index');

path = require('path')

module.exports = {
    getAgregarTarea: async function(req, res, next){
        global.direccion = './archivosPrueba';
        res.render('speaker/AgregarTarea')
    },
    postAgregarTarea: async function (req, res, next) {
        console.log(req.body);
        const responseDB = await Controller.insertHomework(req.body, 8);
        const homeworkID = responseDB[0][0].ID;
        const raiz = path.join(__dirname, '../../') + 'archivosPrueba/'
        let linkMultimedia = raiz.replace(/[\\]/g, '\\\\');

        for (const file of req.files) {
            const nombreMultimedia = file.originalname;
            const tipoMultimedia = file.mimetype;
            linkMultimedia += nombreMultimedia;
            datos = {homeworkID, nombreMultimedia, linkMultimedia, tipoMultimedia};
            await Controller.insertHomeworkMultimedia(datos);
        }

        res.redirect('http://localhost:3000/ponente/AgregarTareaPrueba')
    },
    getDescargarArchivos: async function (req, res, next) {
        const raiz = path.join(__dirname, '../../');
        const archivo = 'Actividad 2 S4.1.png';
        const direccion = `${raiz}archivosPrueba/${archivo}`

        res.download(`${direccion}${archivo}`)
    },
};