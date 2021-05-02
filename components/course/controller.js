module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../store/mysql');
    }

    function list() {
        const VIEW = 'verDatosCursos';
        //const CLAUSE = `WHERE \`Usuario\` = 'E'`;
        return store.list(VIEW/*, CLAUSE*/);
    }

    function get(id) {
        const VIEW = 'verDatosCursos';
        const CLAUSE = `WHERE idCurso = ?`;
        return store.get(VIEW, CLAUSE, id);
    }

    function insert(body) {
        const {
            nombre, clave, descripcion, fechaInicio, fechaFinal, horaInicio, 
            horaFin, fechaInscripcionInicio, fechaInscripcionFinal, plataforma,
             area, tipo, temario, modalidad, capacidad,
              activo, link, foto, ponenteId
        } = body;

        const PROCEDURE = `CALL agregar_Curso( 
            '${nombre}', '${clave}', '${descripcion}', '${fechaInicio}', '${fechaFinal}',
            '${horaInicio}', '${horaFin}', '${fechaInscripcionInicio}', '${fechaInscripcionFinal}', '${plataforma}',
             '${area}','${tipo}', '${temario}', '${modalidad}', ${capacidad}, ${activo},
            '${link}', '${foto}', ${ponenteId}
            )`

        return store.insert(PROCEDURE);
    }

    function update(body) {
        const {
            Id,nombre, clave, descripcion, fechaInicio, fechaFinal, horaInicio, 
            horaFin, fechaInscripcionInicio, fechaInscripcionFinal, plataforma,
             area, tipo, temario, modalidad, capacidad,
              activo, link, foto, ponenteId
        } = body;

        const PROCEDURE = `CALL editar_Curso( 
            ${Id}, '${nombre}', '${clave}', '${descripcion}', '${fechaInicio}', '${fechaFinal}',
            '${horaInicio}', '${horaFin}', '${fechaInscripcionInicio}', '${fechaInscripcionFinal}', '${plataforma}',
             '${area}','${tipo}', '${temario}', '${modalidad}', ${capacidad}, ${activo},
            '${link}', '${foto}', ${ponenteId}
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