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
    
    function listCursosDisponibles(idUsuario, areaUsuario) {
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
        const VIEW = 'ver_Datos_Curso_Usuario';
        const CLAUSE = `WHERE idEstudiante = ?`;
        return store.get(VIEW, CLAUSE, id);
    }

    function listAvisosUsuario(id) {
        const VIEW = 'ver_Avisos_Usuario';
        const CLAUSE = `WHERE idEstudiante = ?`;
        return store.get(VIEW, CLAUSE, id);
    }

    function listLinks(id) {
        const VIEW = 'ver_Recursos_Curso_Links';
        const CLAUSE = `WHERE idCurso = ?`;
        return store.get(VIEW, CLAUSE, id);
    }

    function listDocumentos(id) {
        const VIEW = 'ver_Recursos_Curso_Documentos';
        const CLAUSE = `WHERE idCurso = ?`;
        return store.get(VIEW, CLAUSE, id);
    }

    function listAsignacionesEstudiante(id) {
        const VIEW = 'ver_Asignaciones_Curso_Estudiante';
        const CLAUSE = `WHERE idUsuario= 29 and idCurso = ? `;
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
        getMiPerfil,
        getUsuarioArea,
        listCursosDisponibles,
        getCursoInscripcion,
        getTemario,
        listLinks,
        listDocumentos,
        insertEstudianteCurso,
        listAsignacionesEstudiante,
    };
}