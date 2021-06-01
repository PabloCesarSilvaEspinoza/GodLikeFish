module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../store/mysql');
    }
    
    /*-----------------------------------------------------*/ 
    /*                       TAREAS                        */
    /*-----------------------------------------------------*/

    function insertTarea(body, cursoID) {
        const {
            nombreTarea, fechaLimiteTarea, horaLimiteTarea, descripcionTarea
        } = body;

        const PROCEDURE = `CALL agregar_Tarea( 
            ${cursoID}, '${nombreTarea}', '${fechaLimiteTarea}', '${horaLimiteTarea}', '${descripcionTarea}'
            )`

        return store.upsert(PROCEDURE);
    }

    function insertTareaMultimedia(body) {
        const {
            tareaID, nombreMultimedia, linkMultimedia, tipoMultimedia
        } = body; 
        
        const PROCEDURE = `CALL agregar_Multimedia_Tarea( 
            ${tareaID}, '${nombreMultimedia}', '${linkMultimedia}', '${tipoMultimedia}'
            )`

        return store.upsert(PROCEDURE);
    }
    function insertExamen(body) {
        const {
            idCurso, nombreExamen, linkExamen
        } = body;
        
        const PROCEDURE = `CALL agregar_Examen( 
            '${idCurso}', '${nombreExamen}','${linkExamen}'
            )`

        return store.insert(PROCEDURE);
    }

    function listCursosActivos(id) {
        const VIEW = 'ver_Cursos_Activos';
        const CLAUSE = `WHERE ponente_id = ? AND curso_activo = 1`;
        return store.get(VIEW, CLAUSE, id);
    }

    function listAvisosUsuario(id) {
        const VIEW = 'Ver_Avisos_Usuario';
        const CLAUSE = `WHERE cursoEstudiante = ?`;
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
        
    function listCursos() {
        const VIEW = 'ver_Datos_Cursos';
        return store.list(VIEW);
    }
    function listEstudiantes() {
        const VIEW = 'ver_Estudiantes';
        return store.list(VIEW);
    }
    async function getHistorialCursosPonente(id) {
        const VIEW = 'ver_Historial_Cursos_Ponente';
        const CLAUSE = `WHERE idPonente = ?`;
        return store.get(VIEW, CLAUSE, id);
    }

    function getCurso(id) {
        const VIEW = 'ver_Datos_Cursos';
        const CLAUSE = `WHERE idCurso = ?`;
        return store.get(VIEW, CLAUSE, id);
    }

    function listAlumnos() {
        const VIEW = 'ver_Alumnos';
        return store.list(VIEW);
    }

    function getCurso(cursoID) {
        const VIEW = 'ver_Datos_Cursos';
        const CLAUSE = `WHERE idCurso = ?`;
        return store.get(VIEW, CLAUSE, cursoID);
    }

    return {
        insertTarea,
        insertTareaMultimedia,
        listEstudiantes,
        insertExamen,
        listAlumnos,
        listCursos,
        listCursosActivos,
        getHistorialCursosPonente,
        getCurso,
        listAvisosUsuario,
        listLinks,
        listDocumentos,
        
    };
}