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


    /*-----------------------------------------------------*/ 
    /*                       USUARIOS                      */
    /*-----------------------------------------------------*/

    function listUsuariosEnSistema() {
        const VIEW = 'ver_Usuarios_En_Sistema';
        return store.list(VIEW);
    }


    function listRegistrados() {
        const VIEW = 'ver_Usuarios_Resumen_R';
        return store.list(VIEW);
    }

    function listActivos() {
        const VIEW = 'ver_Usuarios_Resumen_A';
        return store.list(VIEW);
    }
    function listInactivos() {
        const VIEW = 'ver_Usuarios_Resumen_I';
        return store.list(VIEW);
    }

    function listUsuariosEnSistemaTarjeta() {
        const VIEW = 'ver_Usuarios_En_Sistema_Tarjeta';
        return store.list(VIEW);
    }

    function listPerfilUsuario() {
        const VIEW = 'ver_Perfil_Usuario';
        return store.list(VIEW);
    }

    function listHitorialCursos() {
        const VIEW = 'ver_Historial_Cursos';
        return store.list(VIEW);
    }


    return {
        getUltimoCurso,
        getUltimoUsuario,
        listCursos,
        insertCurso,
        insertMultimediaCurso,
        listUsuariosEnSistema,
        listRegistrados,
        listActivos,
        listInactivos,
        listUsuariosEnSistemaTarjeta,
        listPerfilUsuario,
        listHitorialCursos,
    };
}