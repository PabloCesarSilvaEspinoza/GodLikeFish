module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../store/mysql');
    }

    function insertHomework(body, cursoID) {
        const {
            nombreTarea, fechaLimiteTarea, horaLimiteTarea, descripcionTarea
        } = body;

        const PROCEDURE = `CALL agregar_Tarea( 
            ${cursoID}, '${nombreTarea}', '${fechaLimiteTarea}', '${horaLimiteTarea}', '${descripcionTarea}'
            )`

        return store.insert(PROCEDURE);
    }

    function insertHomeworkMultimedia(body) {
        const {
            tareaID, nombreMultimedia, linkMultimedia, tipoMultimedia
        } = body;
        console.log(tareaID);
        console.log(nombreMultimedia)
        console.log(linkMultimedia);
        console.log(tipoMultimedia);
        const PROCEDURE = `CALL agregar_Multimedia_Tarea( 
            ${tareaID}, '${nombreMultimedia}', '${linkMultimedia}', '${tipoMultimedia}'
            )`

        return store.insert(PROCEDURE);
    }

    return {
        insertHomework,
        insertHomeworkMultimedia
    };
}