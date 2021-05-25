const fs = require('fs');
const Controller = require('../componentes/administrador/index')

module.exports = {
    crearCarpetaCurso: async function(req, res, next)  {
        const respuestaDB = await Controller.getUltimoCurso();
        const cursoID = respuestaDB[0].cursoID;
        global.ultimoCursoID = cursoID;
        const raiz = path.join(__dirname, '../');
        const direccion = `${raiz}public/assets/multimedia/cursos/${cursoID}`
        if(!fs.existsSync(direccion)){
            fs.mkdir(direccion, error => {
                if (error) {
                    console.log(`Carpeta cursos ${error.message}`);
                }
            });
            fs.mkdir(direccion + '/recursos', error => {
                if(error){
                    console.log(`Carpeta recursos ${error.message}`);
                }
            });
            fs.mkdir(direccion + '/tareas', error => {
                if(error){
                    console.log(`Carpeta tareas ${error.message}`);
                }
            });
        }
        return next();
    }, 
    crearCarpetaUsuario: async function(req, res, next)  {
        const respuestaDB = await Controller.getUltimoUsuario();
        const usuarioID = respuestaDB[0].usuarioID;
        global.ultimoUsuarioID = usuarioID;
        const raiz = path.join(__dirname, '../');
        const direccion = `${raiz}public/assets/multimedia/usuarios/${usuarioID}`
        if(!fs.existsSync(direccion)){
            fs.mkdir(direccion, error => {
                if (error) {
                    console.log(`Carpeta usuario ${error.message}`);
                }
            });
        }
        return next();
    }, 
};