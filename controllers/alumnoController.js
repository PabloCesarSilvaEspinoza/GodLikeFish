module.exports = {

    postDetallesCurso: async function(req, res, next){
        res.render('alumno/detallesCurso', {
            nombreCurso:"Nombre del Curso Lorem Ipsum",
        });
    },

};