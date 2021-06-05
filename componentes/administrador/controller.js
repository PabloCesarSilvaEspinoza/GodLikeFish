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

    function getUsuarioEditar(id) {
        const VIEW = 'ver_Datos_Usuario_Editar';
        const CLAUSE = `WHERE idUsuario = ?`;
        return store.get(VIEW, CLAUSE, id);
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

    async function getUsuario(id) {
        const VIEW = 'ver_Credenciales_Usuario';
        const CLAUSE = `WHERE idUsuario = ?`;
        return store.get(VIEW, CLAUSE, id);
    }

    function listPaises() {
        const VIEW = 'ver_Paises';
        return store.list(VIEW);
    }

    function listEstados() {
        const VIEW = 'ver_Estados';
        return store.list(VIEW);
    }

    function listMunicipios() {
        const VIEW = 'ver_Municipios';
        return store.list(VIEW);
    }

    function listPuestos() {
        const VIEW = 'ver_Puestos';
        return store.list(VIEW);
    }

    function upsertDatosUsuario(body) {
        const {
            nombres, pApellido, sApellido, matricula, fechaNacimiento, 
            paisNacimientoID, municipioNacimientoID, area, puesto, antiguedad, tarjetonUsuario, exampleInputFile 
        } = body;

        const PROCEDURE = `CALL editar_Datos_Usuario(
            39,'${nombres}','${pApellido}', '${sApellido}','${matricula}','${fechaNacimiento}',
            ${paisNacimientoID},${municipioNacimientoID},${area},${puesto},'${antiguedad}',
            '${tarjetonUsuario}', '${exampleInputFile}'
        )`

        return store.upsert(PROCEDURE);
    }

    function upsertDomicilioUsuario(body) {
        const {
            municipioResidenciaID, colonia, calle, numeroExt, numeroInt, 
        } = body;

        const PROCEDURE = `CALL editar_Domicilio_Usuario(
            39,${municipioResidenciaID},'${colonia}', '${calle}',${numeroExt},${numeroInt}
        )`

        return store.upsert(PROCEDURE);
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
        getUsuarioEditar,
        listPaises,
        listMunicipios,
        listEstados,
        listPuestos,
        upsertDatosUsuario,
        upsertDomicilioUsuario,
    };
}