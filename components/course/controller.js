module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../store/mysql');
    }

    function list() {
        const VIEW = 'ver_Datos_Cursos';
        //const CLAUSE = `WHERE \`Usuario\` = 'E'`;
        return store.list(VIEW/*, CLAUSE*/);
    }

    function get(id) {
        const VIEW = 'ver_Datos_Cursos';
        const CLAUSE = `WHERE idCurso = ?`;
        return store.get(VIEW, CLAUSE, id);
    }

    function insert(body) {
        const {
            nombre, clave, descripcion, fechaInicio, fechaFinal, horaInicio, 
            horaFin, fechaInscripcionInicio, fechaInscripcionFinal, plataforma,
             area, tipo, temario, modalidad, capacidad,
             linkCurso, linkPlataforma,foto, activo, ponenteId
        } = body;

        const PROCEDURE = `CALL agregar_Curso( 
            '${nombre}', '${clave}', '${descripcion}', '${fechaInicio}', '${fechaFinal}',
            '${horaInicio}', '${horaFin}', '${fechaInscripcionInicio}', '${fechaInscripcionFinal}', '${plataforma}',
             '${area}','${tipo}', '${temario}', '${modalidad}',, ${capacidad},
             '${linkCurso}',  '${linkPlataforma}', '${foto}', ${activo}, ${ponenteId}
            )`

        return store.insert(PROCEDURE);
    }

    function update(body) {
        const {
            Id,nombre, clave, descripcion, fechaInicio, fechaFinal, horaInicio, 
            horaFin, fechaInscripcionInicio, fechaInscripcionFinal, plataforma,
             area, tipo, temario , modalidad, capacidad,
               linkCurso, linkPlataforma,foto, activo, ponenteId
        } = body;

        const PROCEDURE = `CALL editar_Curso( 
            ${Id}, '${nombre}', '${clave}', '${descripcion}', '${fechaInicio}', '${fechaFinal}',
            '${horaInicio}', '${horaFin}', '${fechaInscripcionInicio}', '${fechaInscripcionFinal}', '${plataforma}',
             '${area}','${tipo}', '${temario}', '${modalidad}', ${capacidad},
            '${linkCurso}',  '${linkPlataforma}', '${foto}', ${activo}, ${ponenteId}
            )`

        return store.insert(PROCEDURE);
    }
//------------------------------Examenes--------------------------------


function listE() {
    const VIEW = 'ver_Examenes';
    return store.list(VIEW);
}

function getE(id) {
    const VIEW = 'ver_Examenes';
    const CLAUSE = `WHERE idExamen = ?`;
    return store.get(VIEW, CLAUSE, id);
}

function insertE(body) {
    const {
        cursoId, nombre, link
    } = body;

    const PROCEDURE = `CALL agregar_Examen( 
        ${cursoId}, '${nombre}', '${link}'
        )`

    return store.insert(PROCEDURE);
}

function updateE(body) {
    const {
        Id,cursoId, nombre, link
    } = body;

    const PROCEDURE = `CALL editar_Examen( 
        ${Id}, ${cursoId}, '${nombre}', '${link}'
        )`

    return store.insert(PROCEDURE);
}



//---------------------------------------------------------------------
    
    return {
        list,
        listE,
        get,
        getE,
        insert,
        insertE,
        update,
        updateE,
    };
}