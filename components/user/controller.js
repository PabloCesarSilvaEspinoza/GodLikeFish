module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../store/mysql');
    }

    function list() {
        const VIEW = 'verUsuarios';
        //const CLAUSE = `WHERE \`Usuario\` = 'E'`;
        return store.list(VIEW/*, CLAUSE*/);
    }

    function get(id) {
        const VIEW = 'verUsuarios';
        const CLAUSE = `WHERE idCurso = ?`;
        return store.get(VIEW, CLAUSE, id);
    }

    function insert(body) {
        const {
            correo, password, municipioResidenciaID, colonia, calle, numeroExt, numeroInt,
            nombres, pApellido, sApellido, matricula, tipo, fechaNacimiento, paisNacimientoID,
            municipioNacimientoID, area, puesto, antiguedad, tarjetonURL, fotoURL
        } = body;

        const PROCEDURE = `CALL agregarUsuario( 
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
        const PROCEDURE = `CALL editarUsuario(
            ${ID}, '${correo}', '${password}', ${municipioResidenciaID}, '${colonia}', '${calle}',
            ${numeroExt}, ${numeroInt}, '${nombres}','${pApellido}','${sApellido}', '${matricula}',
            '${tipo}', '${fechaNacimiento}', ${paisNacimientoID}, ${municipioNacimientoID}, '${area}',
            '${puesto}', ${antiguedad}, ${activo}, '${tarjetonURL}', '${fotoURL}'
            )`
        
        return store.insert(PROCEDURE);
    }

    return {
        list,
        get,
        insert,
        update,
    };
}