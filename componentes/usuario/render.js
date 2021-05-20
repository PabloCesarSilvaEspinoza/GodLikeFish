const Controller = require('./index');

module.exports = {
    getVerUsuarios:async function(req, res, next){
    },

    getVerUsuario: async function(req, res, next){
        const id = req.params.id;
        const course = await Controller.get(id);
        res.render('course/detallesCurso', course[0]);
    },

    postAgregarUsuario: async function(req, res, next){
        await Controller.insert(req.body);
       res.redirect('/');
    },

    putEditarUsuario: async function(req, res, next){
        await Controller.update(req.body);
       res.redirect('/');
    },
    getDescargarTemario: async function(req, res, next){
        const consultaBD = await Controller.listTemariosCursos(req.params.id);
        const temario = consultaBD[0].cursoTemario;
        const raiz = path.join(__dirname, '../../public/assets/multimedia/courses/');
        const direccion = `${raiz}${temario}`
        res.download(`${direccion}`)
    }
};