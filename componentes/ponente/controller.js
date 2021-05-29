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

    function getUltimaTarea() {
        const VIEW = 'ver_Ultima_Tarea';
        return store.list(VIEW);
    }

    function listCursosActivos(id) {
        const VIEW = 'ver_Cursos_Activos';
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
        insertMultimediaTarea,
        listAlumnos,
        listCursos,
        listCursosActivos,
        getUltimaTarea
    };
}