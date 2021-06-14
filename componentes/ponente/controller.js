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
            ${idCurso}, '${nombreTarea}', '${fechaLimiteTarea} ${horaLimiteTarea}', '${descripcionTarea}', ${atemporalCurso}
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
        const { idCurso, nombreExamen, linkExamen, fechaAplicacionExamen, horaAplicacionExamen } = body; 
        const PROCEDURE = `CALL agregar_Examen(${idCurso}, '${nombreExamen}','${linkExamen}', '${fechaAplicacionExamen} ${horaAplicacionExamen}')`
        console.log(PROCEDURE);
        return store.insert(PROCEDURE);
    }

    function listCursosActuales(idPonente) {
        const VIEW = 'ver_Cursos_Actuales_Ponente';
        const CLAUSE = `WHERE idPonente = ?`;
        
        return store.get(VIEW, CLAUSE, idPonente);
    }

    function getUltimaTarea() {
        const VIEW = 'ver_Ultima_Tarea';
        return store.list(VIEW);
    }

    /*-----------------------------------------------------*/ 
    /*                       CURSOS                        */
    /*-----------------------------------------------------*/

    function listAvisosCurso(idCurso) {
        const VIEW = 'ver_Avisos_Curso';
        const CLAUSE = `WHERE idCurso = ?`;
        return store.get(VIEW, CLAUSE, idCurso);
    }

    function listLinksCurso(idCurso) {
        const VIEW = 'ver_Recursos_Curso_Links';
        const CLAUSE = `WHERE idCurso = ?`;
        return store.get(VIEW, CLAUSE, idCurso);
    }

    function listDocumentosCurso(idCurso) {
        const VIEW = 'ver_Recursos_Curso_Documentos';
        const CLAUSE = `WHERE idCurso = ?`;
        return store.get(VIEW, CLAUSE, idCurso);
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

    function listAsignacionesPonente(id) {
        const VIEW = 'ver_Asignaciones_Curso_Ponente';
        const CLAUSE = `WHERE idCurso = ?`;
        return store.get(VIEW, CLAUSE, id);
    }

    function reportarProblemaCurso(idUsuario, idCurso, asunto, descripcion){
        const PROCEDURE = `CALL agregar_Problemas_Curso(${idUsuario}, ${idCurso}, '${asunto}', '${descripcion}')`;
        return store.insert(PROCEDURE);
    }
    
    function reportarProblemaUsuario(idUsuario, asunto, descripcion){
        const PROCEDURE = `CALL agregar_Problemas_Usuario(${idUsuario}, '${asunto}', '${descripcion}')`;
        return store.insert(PROCEDURE);
    }

    function getConsultarEstadoCursoPonente(usuarioID, cursoID) {
        const PROCEDURE = `CALL ver_Estado_Curso_Ponente(${usuarioID}, ${cursoID})`;
        return store.catalog(PROCEDURE);
    }

    function insertAviso(body) {
        const { idCurso, asuntoAviso, descripcionAviso } = body; 
        const PROCEDURE = `CALL agregar_Aviso(${idCurso}, '${asuntoAviso}','${descripcionAviso}')`
        return store.insert(PROCEDURE);
    }

    function insertEnlace(body) {
        const { idCurso, nombreLink, link } = body; 
        const PROCEDURE = `CALL agregar_Link(${idCurso}, '${nombreLink}','${link}')`
        return store.insert(PROCEDURE);
    }

    function listExamenes(idCurso) {
        const VIEW = 'ver_Examenes';
        const CLAUSE = `WHERE idCurso = ?`;
        return store.list(VIEW, CLAUSE, idCurso);
    }

    function getArchivosTarea(idTarea) {
        const VIEW = 'ver_Archivos_Tarea';
        const CLAUSE = `WHERE idTarea = ?`;
        return store.list(VIEW, CLAUSE, idTarea);
    }

    function getArchivosTareaCurso(idCurso) {
        const VIEW = 'ver_Archivos_Tarea';
        const CLAUSE = `WHERE idCurso = ?`;
        return store.list(VIEW, CLAUSE, idCurso);
    }

    function insertArchivosMultimediaCurso(idCurso, nombreArchivo){
        const PROCEDURE = `CALL agregar_Archivos_Multimedia_Curso(${idCurso}, '${nombreArchivo}')`
        return store.insert(PROCEDURE);
    }

    function listPublicacionesCurso(idCurso) {
        const VIEW = 'ver_Historial_Publicaciones';
        const CLAUSE = `WHERE idCurso = ?`;
        return store.list(VIEW, CLAUSE, idCurso);
    }

    return {
        insertTarea,
        listEstudiantes,
        insertExamen,
        listAlumnos,
        listCursos,
        getHistorialCursosPonente,
        getCurso,
        listAvisosCurso,
        listLinksCurso,
        listDocumentosCurso,
        listCursosActuales,
        insertMultimediaTarea,
        listAlumnos,
        listCursos,
        //listCursosActivos,
        getUltimaTarea,
        getProximoCurso,
        listAsignacionesPonente,
        reportarProblemaCurso,
        reportarProblemaUsuario,
        getConsultarEstadoCursoPonente,
        insertAviso,
        insertEnlace,
        listExamenes,
        getArchivosTarea,
        getArchivosTareaCurso,
        insertArchivosMultimediaCurso,
        listPublicacionesCurso,
    };
}