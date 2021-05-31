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

    function listCursosActuales(id) {
        const VIEW = 'ver_Cursos_Actuales_Ponente';
        const CLAUSE = `WHERE ponente_id = ? AND curso_activo = 1`;
        return store.get(VIEW, CLAUSE, id);
    }
        
    function listCursos() {
        const VIEW = 'ver_Datos_Cursos';
        return store.list(VIEW);
    }
    function listAlumnos() {
        const VIEW = 'ver_Alumnos';
        return store.list(VIEW);
    }
    return {
        insertTarea,
        insertTareaMultimedia,
        listAlumnos,
        listCursos,
        listCursosActuales,
    };
}