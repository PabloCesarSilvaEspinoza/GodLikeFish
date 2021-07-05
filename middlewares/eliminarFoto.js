const fs = require('fs')

const ControllerA = require('../componentes/administrador/index')
module.exports ={
    eliminarFoto: async function(req, res, next){
        const cursoID = req.params.idCurso;
        global.cursoIdEditar = req.params.idCurso;
        const raiz = path.join(__dirname, '../');
        const respuestaFotoCurso = await ControllerA.getFotoCurso(cursoID);
        const fotoCurso = respuestaFotoCurso[0].fotoCurso;

        fs.unlink(`${raiz}public/assets/multimedia/cursos/${cursoID}/${fotoCurso}`, (error)=>{
            if(error){
                throw error;
            }
        })

        return next();
    }
}