module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../store/mysql');
    }

    /*-----------------------------------------------------*/ 
    /*                      DASHBOARD                      */
    /*-----------------------------------------------------*/

    function getUsuarioArea(usuarioID){
        const VIEW = 'ver_Usuario_Area';
        const CLAUSE = `WHERE idUsuario = ?`
        return store.get(VIEW, CLAUSE, usuarioID);
    }
    
    function listCursosDisponibles(idUsuario) {
        const PROCEDURE = `CALL ver_Cursos_Disponibles_Estudiante(${idUsuario})`
        return store.catalog(PROCEDURE)
    }

    /*-----------------------------------------------------*/ 
    /*                        CURSOS                       */
    /*-----------------------------------------------------*/
    function getHistorialCursosEstudiante(id) {
        const VIEW = 'ver_Historial_Cursos_Estudiante';
        const CLAUSE = `WHERE idUsuario = ?`;
        return store.get(VIEW, CLAUSE, id);
    }

    function getCursoInscripcion(cursoID) {
        const VIEW = 'ver_Datos_Cursos';
        const CLAUSE = `WHERE idCurso = ?`;
        return store.get(VIEW, CLAUSE, cursoID);
    }
    function getCursoActual(estudianteID) {
        const VIEW = 'ver_Curso_Actual_Estudiante';
        const CLAUSE = `WHERE idEstudiante = ?`;
        return store.get(VIEW, CLAUSE, estudianteID);
    }
    function getTemario(cursoID) {
        const VIEW = 'ver_Temario_Curso';
        const CLAUSE = `WHERE cursoID = ?`;
        return store.get(VIEW, CLAUSE, cursoID);
    }
    function insertCalificacionExperiencia(idUsuario, idCurso) {
        const PROCEDURE = `CALL editar_Calificacion_Experiencia_Curso(${idUsuario}, ${idCurso})`
        return store.insert(PROCEDURE);
    }

    
    function getConsultarEstadoCursoEstudiante(usuarioID, cursoID) {
        const PROCEDURE = `CALL ver_Estado_Curso_Estudiante(${usuarioID}, ${cursoID})`;
        return store.catalog(PROCEDURE);
    }
    
    /*-----------------------------------------------------*/ 
    /*                      INSCRIPCIÓN                    */
    /*-----------------------------------------------------*/

    function insertEstudianteCurso(idUsuario, idCurso) {
        const PROCEDURE = `CALL inscribir_Estudiante(${idUsuario}, ${idCurso})`
        return store.insert(PROCEDURE);
    }

    /*-----------------------------------------------------*/ 
    /*                        TAREAS                       */
    /*-----------------------------------------------------*/
    function list() {
        const VIEW = 'ver_Tarea';
        //const CLAUSE = `WHERE \`Usuario\` = 'E'`;
        return store.list(VIEW/*, CLAUSE*/);
    }
    function get(id) {
        const VIEW = 'ver_Tarea';
        const CLAUSE = `WHERE idTarea = ?`;
        return store.get(VIEW, CLAUSE, id);
    }
    /*-----------------------------------------------------*/ 
    /*                        Reportes                       */
    /*-----------------------------------------------------*/
    
    function insert(body) {
        const {
            cursoId, nombre, fechaSubida ,fechaLImite, horaLimite, descripcion
        } = body;
    
        const PROCEDURE = `CALL agregar_Tarea( 
            ${cursoId}, '${nombre}', '${fechaSubida}','${fechaLImite}','${horaLimite}','${descripcion}'
            )`
    
        return store.upsert(PROCEDURE);
    }
    
    function update(body) {
        const {
            Id, cursoId, nombre, fechaSubida ,fechaLImite, horaLimite, descripcion
        } = body;
    
        const PROCEDURE = `CALL editar_Tarea( 
            ${Id},  ${cursoId}, '${nombre}', '${fechaSubida}','${fechaLImite}','${horaLimite}','${descripcion}'
            )`
    
        return store.upsert(PROCEDURE);
    }
    function insertReporte(body
        ) {
        const {
            usuarioID, asunto, descripcion 
        } = body;

        const PROCEDURE = `agregar_Problemas_Usuario( 
            ${usuarioID}, '${asunto}','${descripcion}'
            )`
    
        return store.insert(PROCEDURE);
    }
    

    //----------------------- falta agregar el and al WHERE para el id de el usuario
    function listDatosCursoUsuario(id) {
        const VIEW = 'ver_Datos_Curso_Usuario';
        const CLAUSE = `WHERE idEstudiante = ?`;
        return store.get(VIEW, CLAUSE, id);

    }

    function listAvisosUsuario(id) {
        const VIEW = 'ver_Avisos_Usuario';
        const CLAUSE = `WHERE cursoID = ?`;
        return store.get(VIEW, CLAUSE, id);
    }

    function listLinks(id) {
        const VIEW = 'ver_Recursos_Curso_Links';
        const CLAUSE = `WHERE idCurso = ?`;
        return store.get(VIEW, CLAUSE, id);
    }

    function listDocumentos(id) {
        const VIEW = 'ver_Recursos_Curso_Documentos';
        const CLAUSE = `WHERE idCurso = ?`;
        return store.get(VIEW, CLAUSE, id);
    }

    function getHistorialCursosEstudiante(id) {
        const VIEW = 'ver_Historial_Cursos_Estudiante';
        const CLAUSE = `WHERE idUsuario = ?`;
        return store.get(VIEW, CLAUSE, id);
    }

    function listAsignacionesEstudiante(id) {
        const VIEW = 'ver_Asignaciones_Curso_Estudiante';
        const CLAUSE = `WHERE idUsuario= 29 and idCurso = ? `;
        return store.get(VIEW, CLAUSE, id);
    }
    async function getMiPerfil(id) {
        const VIEW = 'ver_Usuarios';
        const CLAUSE = `WHERE id = ?`;
        return store.get(VIEW, CLAUSE, id);
    }
    function listExamenes(idCurso) {
        const VIEW = 'ver_Examenes';
        const CLAUSE = `WHERE idCurso = ?`;
        return store.list(VIEW, CLAUSE, idCurso);
    }

    return {
        list,
        get,
        insert,
        update,
        listDatosCursoUsuario,
        listAvisosUsuario,
        getMiPerfil,
        getUsuarioArea,
        listCursosDisponibles,
        getCursoInscripcion,
        getTemario,
        getHistorialCursosEstudiante,
        listLinks,
        listDocumentos,
        insertEstudianteCurso,
        listAsignacionesEstudiante,
        listExamenes,
<<<<<<< HEAD
        getHistorialCursosEstudiante,
        getCursoActual,
        insertReporte,
=======
        insertCalificacionExperiencia,
        getHistorialCursosEstudiante,
        getCursoActual,
        getConsultarEstadoCursoEstudiante
>>>>>>> NEO_Trial
    };
}