const Controller = require('./index');

path = require('path')



module.exports = {
    getAdministrarCursos: async function(req, res, next){
        const courses = await Controller.listCourses();
        res.render('course/administrarCursos',{
            dataTablesExport:true,
            courses
        });
    },
    postAgregarCurso: async function (req, res, next){
        const responseDB = await Controller.insertCourse(req.body);
        const courseID = responseDB[0][0].ID;
        res.redirect('/admin/administrarCursos')
    }
};