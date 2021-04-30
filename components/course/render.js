const Controller = require('./index');

module.exports = {

    postDetallesCurso: async function(req, res, next){
        const id = req.params.id;
        const course = await Controller.get(id);
        console.log(course[0].nombreCurso);
        res.render('course/detallesCurso', course[0]);
    },
};