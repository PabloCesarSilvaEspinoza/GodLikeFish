module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../store/mysql');
    }

    function list() {
        const VIEW = 'ver_Tarea';
        //const CLAUSE = `WHERE \`Usuario\` = 'E'`;
        return store.list(VIEW/*, CLAUSE*/);
    }
    function get(id) {
        const VIEW = 'ver_Tarea';
        const CLAUSE = `WHERE idTarea = ?`;
        return store.get(VIEW, CLAUSE, id);
    }
    
    function insert(body) {
        const {
            cursoId, nombre, fechaSubida ,fechaLImite, horaLimite, descripcion
        } = body;
    
        const PROCEDURE = `CALL agregar_Tarea( 
            ${cursoId}, '${nombre}', '${fechaSubida}','${fechaLImite}','${horaLimite}','${descripcion}'
            )`
    
        return store.insert(PROCEDURE);
    }
    
    function update(body) {
        const {
            Id, cursoId, nombre, fechaSubida ,fechaLImite, horaLimite, descripcion
        } = body;
    
        const PROCEDURE = `CALL editar_Tarea( 
            ${Id},  ${cursoId}, '${nombre}', '${fechaSubida}','${fechaLImite}','${horaLimite}','${descripcion}'
            )`
    
        return store.insert(PROCEDURE);
    }

    //----------------------- falta agregar el and al WHERE para el id de el uzuario
    function listDatosCursoUsuario(id) {
        const VIEW = 'Ver_Datos_Curso_Usuario';
        const CLAUSE = `WHERE idEstudiante = ?`;
        return store.get(VIEW, CLAUSE, id);
    }

    function listAnunciosUsuario(id) {
        const VIEW = 'Ver_Anuncios_Usuario';
        const CLAUSE = `WHERE idEstudiante = ?`;
        return store.get(VIEW, CLAUSE, id);
    }

    function listRecursosUsuarioDocumentos(id) {
        const VIEW = 'Ver_Recursos_Usuario_Documentos';
        const CLAUSE = `WHERE idEstudiante = ?`;
        return store.get(VIEW, CLAUSE, id);
    }
    
    function listRecursosUsuarioLinks(id) {
        const VIEW = 'Ver_Recursos_Usuario_Links';
        const CLAUSE = `WHERE idEstudiante = ?`;
        return store.get(VIEW, CLAUSE, id);
    }
    function listAsignacionesUsuario(id) {
        const VIEW = 'Ver_Recurso';
        const CLAUSE = `WHERE idEstudiante = ?`;
        return store.get(VIEW, CLAUSE, id);
    }
    async function getMiPerfil(id) {
        const VIEW = 'ver_Usuarios';
        const CLAUSE = `WHERE id = ?`;
        return store.get(VIEW, CLAUSE, id);
    }



    return {
        list,
        get,
        insert,
        update,
        listDatosCursoUsuario,
        listAnunciosUsuario,
        listRecursosUsuarioDocumentos,
        listRecursosUsuarioLinks,
        getMiPerfil,

    };
}