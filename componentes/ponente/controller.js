module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../store/mysql');
    }
    
    /*-----------------------------------------------------*/ 
    /*                       TAREAS                        */
    /*-----------------------------------------------------*/

    function insertTarea(body) {
        const {
            idCurso, nombreTarea, fechaLimiteTarea, horaLimiteTarea, descripcionTarea, atemporalCurso
        } = body;

        const PROCEDURE = `CALL agregar_Tarea( 
            ${idCurso}, '${nombreTarea}', '${fechaLimiteTarea}', '${horaLimiteTarea}', '${descripcionTarea}', ${atemporalCurso}
            )`;

        return store.upsert(PROCEDURE);
    }

    function insertMultimediaTarea(body) {
        const {
            tareaID, nombreMultimedia, linkMultimedia
        } = body;
        
        const PROCEDURE = `CALL agregar_Multimedia_Tarea( 
            ${tareaID}, '${nombreMultimedia}', '${linkMultimedia}'
            )`;
        
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

    function listCursosActuales(id) {
        const VIEW = 'ver_Cursos_Actuales_Ponente';
        const CLAUSE = `WHERE CURDATE() <= curso_fecha_fin AND idPonente = ? AND estado = 1`;
        
        return store.get(VIEW, CLAUSE, id);
    }

    function getUltimaTarea() {
        const VIEW = 'ver_Ultima_Tarea';
        return store.list(VIEW);
    }

    /*-----------------------------------------------------*/ 
    /*                       CURSOS                        */
    /*-----------------------------------------------------*/

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

    function getProximoCurso(idPonente) {
        const VIEW = 'ver_Proximo_Curso';
        const CLAUSE = 'WHERE ponente_id = ? LIMIT 1'

        return store.get(VIEW, CLAUSE, idPonente);
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
        listEstudiantes,
        insertExamen,
        listAlumnos,
        listCursos,
        getHistorialCursosPonente,
        getCurso,
        listAvisosUsuario,
        listLinks,
        listDocumentos,
        listCursosActuales,
        insertMultimediaTarea,
        listAlumnos,
        listCursos,
        //listCursosActivos,
        getUltimaTarea,
        getProximoCurso
    };
}