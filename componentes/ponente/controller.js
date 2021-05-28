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

        return store.insert(PROCEDURE);
    }

    function insertTareaMultimedia(body) {
        const {
            tareaID, nombreMultimedia, linkMultimedia, tipoMultimedia
        } = body;
        
        const PROCEDURE = `CALL agregar_Multimedia_Tarea( 
            ${tareaID}, '${nombreMultimedia}', '${linkMultimedia}', '${tipoMultimedia}'
            )`

        return store.insert(PROCEDURE);
    }
    function listAlumnos() {
        const VIEW = 'ver_Datos_Alumno';
        return store.list(VIEW);
    }
    function listCursos() {
        const VIEW = 'ver_Datos_Cursos';
        return store.list(VIEW);
    }
    return {
        insertTarea,
        insertTareaMultimedia,
        listAlumnos,
        listCursos,
    };
}