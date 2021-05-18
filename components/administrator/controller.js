module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../store/mysql');
    }
    
    /*-----------------------------------------------------*/ 
    /*                       CURSOS                        */
    /*-----------------------------------------------------*/

    function getLastCourse() {
        const VIEW = 'ver_Ultimo_Curso';
        return store.list(VIEW);
    }

    function listCourses() {
        const VIEW = 'ver_Datos_Cursos';
        return store.list(VIEW);
    }

    function insertCourse(body) {
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

        return store.insert(PROCEDURE);
    }

    function insertMultimediaCourse(cursoID, temarioCurso, fotoCurso) {
        const PROCEDURE = `CALL agregar_Multimedia_Curso( ${cursoID},  '${temarioCurso}', '${fotoCurso}' )`

        return store.insert(PROCEDURE);
    }

    return {
        getLastCourse,
        listCourses,
        insertCourse,
        insertMultimediaCourse,
    };
}