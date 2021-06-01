const fs = require('fs');
const ControllerA = require('../componentes/administrador/index')
const ControllerP = require('../componentes/ponente/index');

module.exports = {
    crearCarpetaCurso: async function(req, res, next)  {
        const respuestaDB = await ControllerA.getUltimoCurso();
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
        }
        return next();
    }, 
    crearCarpetaUsuario: async function(req, res, next)  {
        const respuestaDB = await ControllerA.getUltimoUsuario();
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
    crearCarpetaTarea: async function(req, res, next)  {
        const respuestaDB = await ControllerP.getUltimaTarea();
        const tareaID = respuestaDB[0].tareaID;
        global.ultimaTareaID = tareaID;
        const raiz = path.join(__dirname, '../');
        const direccion = `${raiz}public/assets/multimedia/tareas/${tareaID}`
        if(!fs.existsSync(direccion)){
            fs.mkdir(direccion, error => {
                if(error){
                    console.log(`Carpeta tareas ${error.message}`);
                }
            });
        }
        return next();
    }, 
};