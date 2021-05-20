const fs = require('fs');
const Controller = require('../componentes/administrador/index')

module.exports = {
    crearCarpetaCurso: async function(req, res, next)  {
        const responseDB = await Controller.getUltimoCurso();
        const cursoID = responseDB[0].cursoID;
        global.ultimoCursoID = cursoID;
        const raiz = path.join(__dirname, '../');
        const direccion = `${raiz}public/assets/multimedia/courses/${cursoID}`
        console.log(direccion);
        if(!fs.existsSync(direccion)){
            fs.mkdir(direccion, error => {
                if (error) {
                    console.log(`Carpeta courses ${error.message}`);
                }
            });
            fs.mkdir(direccion + '/resources', error => {
                if(error){
                    console.log(`Carpeta resources ${error.message}`);
                }
            });
            fs.mkdir(direccion + '/homewroks', error => {
                if(error){
                    console.log(`Carpeta homewroks ${error.message}`);
                }
            });
        }
        return next();
    }
};