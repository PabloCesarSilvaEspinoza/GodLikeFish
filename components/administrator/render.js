const Controller = require('./index');
const fs = require('fs');

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
        const cursoID = responseDB[0][0].ID;
        const fotoCurso = `${cursoID}/${req.files.fotoCurso[0].originalname}`;
        const temarioCurso = `${cursoID}/${req.files.temarioCurso[0].originalname}`;
        await Controller.insertMultimediaCourse(cursoID, temarioCurso, fotoCurso)
        res.redirect('/admin/administrarCursos')
    },
};