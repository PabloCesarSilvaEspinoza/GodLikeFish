const fs = require('fs')

const ControllerA = require('../componentes/administrador/index')
module.exports ={
    eliminarFoto: async function(req, res, next){
        const cursoId = req.params.idCurso;
        global.cursoIdEditar = req.params.idCurso;
        const raiz = path.join(__dirname, '../');
        const respuestaDb = await ControllerA.getCursoEditar(cursoId);
        const foto = respuestaDb[0].foto;

        fs.unlink(`${raiz}public/assets/multimedia/cursos/${cursoId}/${foto}`, (error)=>{
            if(error){
                throw error;
            }
        })

        return next();
    }
}