module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../store/mysql');
    }
    
    /*-----------------------------------------------------*/ 
    /*                       CURSOS                        */
    /*-----------------------------------------------------*/

    function getUltimoCurso() {
        const VIEW = 'ver_Ultimo_Curso';
        return store.list(VIEW);
    }

    function getUltimoUsuario() {
        const VIEW = 'ver_Ultimo_Usuario';
        return store.list(VIEW);
    }

    function listCursos() {
        const VIEW = 'ver_Datos_Cursos';
        return store.list(VIEW);
    }

    function insertCurso(body) {
        const {
            nombreCurso, claveCurso, descripcionCurso, fechaInicioCurso, fechaFinCurso, horarioInicioCurso,
            horarioFinCurso, fechaInscripcionInicioCurso, fechaInscripcionFinCurso, plataformaCurso, areaCurso,
            tipoCurso, temarioCurso, modalidadCurso, capacidadCurso, fotoCurso, ponenteID  
        } = body;

        const PROCEDURE = `CALL agregar_Curso(
            '${nombreCurso}','${claveCurso}','${descripcionCurso}', '${fechaInicioCurso}','${fechaFinCurso}','${horarioInicioCurso}',
            '${horarioFinCurso}','${fechaInscripcionInicioCurso}','${fechaInscripcionFinCurso}','${plataformaCurso}','${areaCurso}',
            '${tipoCurso}', '${temarioCurso}','${modalidadCurso}', ${capacidadCurso},'${fotoCurso}', ${ponenteID}
        )`

        return store.upsert(PROCEDURE);
    }

    function insertMultimediaCurso(cursoID, temarioCurso, fotoCurso) {
        const PROCEDURE = `CALL agregar_Multimedia_Curso( ${cursoID},  '${temarioCurso}', '${fotoCurso}' )`

        return store.upsert(PROCEDURE);
    }

    return {
        getUltimoCurso,
        getUltimoUsuario,
        listCursos,
        insertCurso,
        insertMultimediaCurso,
    };
}