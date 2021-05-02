const course = require('./index');
const Controller = require('./index');

module.exports = {

    postDetallesCurso: async function(req, res, next){
        const id = req.params.id;
        const course = await Controller.get(id);
        console.log(course[0].nombreCurso);
        res.render('course/detallesCurso', course[0]);
    },

    postAgregarCurso: async function(req, res, next){
        await Controller.insert(req.body);
       res.redirect('/');
    },

    putEditarCurso: async function(req, res, next){
        await Controller.update(req.body);
       res.redirect('/');
    },

    getCursos:async function(req, res, next){

       const courses= await Controller.list();
       console.log(courses);

    }
};