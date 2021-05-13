const Controller = require('./index');
path = require('path')

module.exports = {
    getAgregarTarea: async function(req, res, next){
        res.render('speaker/AgregarTarea')
    },
    postAgregarTarea: async function (req, res, next) {
        //console.log(req.files);
        const homeworkID = await Controller.insertHomework(req.body, 8);
        const tareaID = homeworkID[0][0].ID;
        const linkMultimedia = path.join(__dirname, '../../');

        for (const file of req.files) {
            const nombreMultimedia = file.originalname;
            const tipoMultimedia = file.mimetype;
            datos = {tareaID, nombreMultimedia, linkMultimedia, tipoMultimedia};
            //console.log(datos);
            await Controller.insertHomeworkMultimedia(datos);
        }

        res.render('speaker/AgregarTarea')
    },
    getDescargarArchivos: async function (req, res, next) {
        const raiz = path.join(__dirname, '../../');
        const archivo = '';
        res.download(`${raiz}archivosPrueba/${archivo}`)
    },
};