module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../store/mysql');
    }

    function listCursos() {
        const VIEW = 'ver_Datos_Cursos';
        //const CLAUSE = `WHERE \`Usuario\` = 'E'`;
        return store.list(VIEW/*, CLAUSE*/);
    }

    function getCurso(id) {
        const VIEW = 'ver_Datos_Cursos';
        const CLAUSE = `WHERE idCurso = ?`;
        return store.get(VIEW, CLAUSE, id);
    }

    function insertCurso(body) {
        const {
            nombre, clave, descripcion, fechaInicio, fechaFinal, horaInicio, 
            horaFin, fechaInscripcionInicio, fechaInscripcionFinal, plataforma,
            area, tipo, temario, modalidad, capacidad,
            linkCurso, linkPlataforma,foto, ponenteId
        } = body;

        const PROCEDURE = `CALL agregar_Curso( 
            '${nombre}', '${clave}', '${descripcion}', '${fechaInicio}', '${fechaFinal}',
            '${horaInicio}', '${horaFin}', '${fechaInscripcionInicio}', '${fechaInscripcionFinal}', '${plataforma}',
            '${area}','${tipo}', '${temario}', '${modalidad}', ${capacidad},
            '${linkCurso}',  '${linkPlataforma}', '${foto}', ${ponenteId}
            )`

        return store.upsert(PROCEDURE);
    }

    function updateCurso(body) {
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

        return store.upsert(PROCEDURE);
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

        return store.upsert(PROCEDURE);
    }

    function updateE(body) {
        const {
            Id,cursoId, nombre, link
        } = body;

        const PROCEDURE = `CALL editar_Examen( 
            ${Id}, ${cursoId}, '${nombre}', '${link}'
            )`

        return store.upsert(PROCEDURE);
    }

    return {
        listCursos,
        listE,
        getCurso,
        getE,
        insertCurso,
        insertE,
        updateCurso,
        updateE,
    };
}