const Controller = require('./index');
const fs = require('fs');

path = require('path')

async function crearCarpetaCurso (cursoID) {
    const raiz = path.join(__dirname, '../../');
    const direccion = `${raiz}multimedia/courses/${cursoID}`
    if(!fs.existsSync(direccion)){
        fs.mkdir(direccion, error => {
            if (error) {
                console.log(error.message);
            }
        });
        fs.mkdir(direccion + '/resources', error => {
            if(error){
                console.log(error.message);
            }
        });
        fs.mkdir(direccion + '/homewroks', error => {
            if(error){
                console.log(error.message);
            }
        });
    }
}

module.exports = {
    getAdministrarCursos: async function(req, res, next){
        const courses = await Controller.listCourses();
        res.render('course/administrarCursos',{
            dataTablesExport:true,
            courses
        });
    },
    postAgregarCurso: async function (req, res, next){
        //const responseDB = await Controller.insertCourse(req.body);
        //const courseID = responseDB[0][0].ID;
        console.log(req.body);
        crearCarpetaCurso(8);
        res.redirect('/admin/administrarCursos')
    },
};