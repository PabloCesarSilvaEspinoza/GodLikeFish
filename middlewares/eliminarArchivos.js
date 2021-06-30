const fs = require('fs')

const ControllerA = require('../componentes/administrador/index')
module.exports ={
    eliminarDocumento: async function(req, res, next){
        const cursoId = req.params.idCurso;
        global.cursoIdEditar = req.params.idCurso;
        const raiz = path.join(__dirname, '../');
        const respuestaDb = await ControllerA.getCursoEditar(cursoId);
        const temario = respuestaDb[0].temario;        

        fs.unlink(`${raiz}public/assets/multimedia/cursos/${cursoId}/${temario}`, (error)=>{
            if(error){
                throw error;
            }
            console.log('El archivo ha sido eliminado')
        })

        return next();
    }
}