module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../store/mysql');
    }

    function list() {
        const VIEW = 'ver_Usuarios';
        //const CLAUSE = `WHERE \`Usuario\` = 'E'`;
        return store.list(VIEW/*, CLAUSE*/);
    }

    function get(id) {
        const VIEW = 'ver_Usuarios';
        const CLAUSE = `WHERE idCurso = ?`;
        return store.get(VIEW, CLAUSE, id);
    }

    function insert(body) {
        const {
            correo, password, municipioResidenciaID, colonia, calle, numeroExt, numeroInt,
            nombres, pApellido, sApellido, matricula, tipo, fechaNacimiento, paisNacimientoID,
            municipioNacimientoID, area, puesto, antiguedad, tarjetonURL, fotoURL
        } = body;

        const PROCEDURE = `CALL agregar_Usuario( 
            '${correo}', '${password}', ${municipioResidenciaID}, '${colonia}', '${calle}',
            ${numeroExt}, ${numeroInt}, '${nombres}', '${pApellido}', '${sApellido}', '${matricula}',
            '${tipo}', '${fechaNacimiento}', ${paisNacimientoID}, ${municipioNacimientoID}, '${area}',
            '${puesto}', ${antiguedad}, '${tarjetonURL}', '${fotoURL}'
            )`

        return store.insert(PROCEDURE);
    }

    function update(body) {
        const {
            ID, correo, password, municipioResidenciaID, colonia, calle, numeroExt, numeroInt,
            nombres, pApellido, sApellido, matricula, tipo, fechaNacimiento, paisNacimientoID,
            municipioNacimientoID, area, puesto, antiguedad, activo, tarjetonURL, fotoURL
        } = body;
        const PROCEDURE = `CALL editar_Usuario(
            ${ID}, '${correo}', '${password}', ${municipioResidenciaID}, '${colonia}', '${calle}',
            ${numeroExt}, ${numeroInt}, '${nombres}','${pApellido}','${sApellido}', '${matricula}',
            '${tipo}', '${fechaNacimiento}', ${paisNacimientoID}, ${municipioNacimientoID}, '${area}',
            '${puesto}', ${antiguedad}, ${activo}, '${tarjetonURL}', '${fotoURL}'
            )`
        
        return store.insert(PROCEDURE);
    }

    function listTemariosCursos(cursoID) {
        const VIEW = 'ver_Temario_Curso';
        const CLAUSE = `WHERE cursoID = ${cursoID}`;
        return store.list(VIEW, CLAUSE);
    }

    return {
        list,
        get,
        insert,
        update,
        listTemariosCursos,
    };
}