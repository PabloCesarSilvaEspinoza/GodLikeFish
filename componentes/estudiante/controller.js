module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../store/mysql');
    }

    /*-----------------------------------------------------*/ 
    /*                      DASHBOARD                      */
    /*-----------------------------------------------------*/

    function getUsuarioArea(usuarioID){
        const VIEW = 'ver_Usuario_Area';
        const CLAUSE = `WHERE idUsuario = ?`
        return store.get(VIEW, CLAUSE, usuarioID);
    }
    
    function listCursosDisponibles(idUsuario) {
        const PROCEDURE = `CALL ver_Cursos_Disponibles_Estudiante(${idUsuario})`
        return store.catalog(PROCEDURE)
    }

    /*-----------------------------------------------------*/ 
    /*                        CURSOS                       */
    /*-----------------------------------------------------*/

    function getCursoInscripcion(cursoID) {
        const VIEW = 'ver_Datos_Cursos';
        const CLAUSE = `WHERE idCurso = ?`;
        return store.get(VIEW, CLAUSE, cursoID);
    }

    function getTemario(cursoID) {
        const VIEW = 'ver_Temario_Curso';
        const CLAUSE = `WHERE cursoID = ?`;
        return store.get(VIEW, CLAUSE, cursoID);
    }
    
    /*-----------------------------------------------------*/ 
    /*                      INSCRIPCIÓN                    */
    /*-----------------------------------------------------*/

    function insertEstudianteCurso(idUsuario, idCurso) {
        const PROCEDURE = `CALL inscribir_Estudiante(${idUsuario}, ${idCurso})`
        return store.insert(PROCEDURE);
    }

    /*-----------------------------------------------------*/ 
    /*                        TAREAS                       */
    /*-----------------------------------------------------*/
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
    
        return store.upsert(PROCEDURE);
    }
    
    function update(body) {
        const {
            Id, cursoId, nombre, fechaSubida ,fechaLImite, horaLimite, descripcion
        } = body;
    
        const PROCEDURE = `CALL editar_Tarea( 
            ${Id},  ${cursoId}, '${nombre}', '${fechaSubida}','${fechaLImite}','${horaLimite}','${descripcion}'
            )`
    
        return store.upsert(PROCEDURE);
    }

    //----------------------- falta agregar el and al WHERE para el id de el usuario
    function listDatosCursoUsuario(id) {
        const VIEW = 'Ver_Datos_Curso_Usuario';
        const CLAUSE = `WHERE idEstudiante = ?`;
        return store.get(VIEW, CLAUSE, id);
    }

    function listAvisosUsuario(id) {
        const VIEW = 'Ver_Avisos_Usuario';
        const CLAUSE = `WHERE idEstudiante = ?`;
        return store.get(VIEW, CLAUSE, id);
    }

    function listLinks(id) {
        const VIEW = 'ver_recursos_curso_links';
        const CLAUSE = `WHERE idCurso = ?`;
        return store.get(VIEW, CLAUSE, id);
    }

    function listDocumentos(id) {
        const VIEW = 'ver_recursos_curso_documentos';
        const CLAUSE = `WHERE idCurso = ?`;
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
        listAvisosUsuario,
        listRecursosUsuarioDocumentos,
        listRecursosUsuarioLinks,
        getMiPerfil,
        getUsuarioArea,
        listCursosDisponibles,
        getCursoInscripcion,
        getTemario,
        listLinks,
        listDocumentos,
        insertEstudianteCurso,
    };
}