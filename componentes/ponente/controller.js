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

    return {
        insertTarea,
        insertTareaMultimedia
    };
}