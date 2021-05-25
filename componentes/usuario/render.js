const controller = require('./controller');
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

    getRegistrar: async function(req, res, next){
        const paises = await Controller.listPaises();
        const estados = await Controller.listEstados();
        const municipios = await Controller.listMunicipios();
        res.render('general/registrar',{
            general: true,
            pickadate: true,
            select2: true,
            paises,
            municipios,
            estados

        });
    },
    
    getDescargarTemario: async function(req, res, next){
        const consultaBD = await Controller.listTemariosCursos(req.params.id);
        const temario = consultaBD[0].cursoTemario;
        const raiz = path.join(__dirname, '../../public/assets/multimedia/cursos/');
        const direccion = `${raiz}${temario}`
        res.download(`${direccion}`)
    }
};
