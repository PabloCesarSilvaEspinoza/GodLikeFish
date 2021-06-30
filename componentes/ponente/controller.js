const mensajes = ["Estas de vuelta","Hola","¿Que tal?,","Estas aquí","Volviste","Regresaste"];
module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../store/mysql');
    }
    
    /*-----------------------------------------------------*/ 
    /*                       TAREAS                        */
    /*-----------------------------------------------------*/

    function insertTarea(body) {
        const {
            idCurso, nombreTarea, fechaLimiteTarea, horaLimiteTarea, descripcionTarea, atemporalCurso
        } = body;

        const PROCEDURE = `CALL agregar_Tarea( 
            ${idCurso}, '${nombreTarea}', '${fechaLimiteTarea} ${horaLimiteTarea}', '${descripcionTarea}', ${atemporalCurso}
            )`;
        return store.upsert(PROCEDURE);
    }

    function insertMultimediaTarea(body) {
        const { tareaID, nombreMultimedia } = body;
        const PROCEDURE = `CALL agregar_Multimedia_Tarea(${tareaID}, '${nombreMultimedia}')`;
        return store.upsert(PROCEDURE);
    }

    function insertExamen(body) {
        const { idCurso, nombreExamen, linkExamen, fechaAplicacionExamen, horaAplicacionExamen } = body; 
        const PROCEDURE = `CALL agregar_Examen(
            ${idCurso}, '${nombreExamen}','${linkExamen}', '${fechaAplicacionExamen} ${horaAplicacionExamen}'
            )`
        return store.insert(PROCEDURE);
    }

    function listCursosActuales(idPonente) {
        const VIEW = 'ver_Cursos_Actuales_Ponente';
        const CLAUSE = `WHERE idPonente = ?`;
        
        return store.get(VIEW, CLAUSE, idPonente);
    }

    function getUltimaTarea() {
        const VIEW = 'ver_Ultima_Tarea';
        return store.list(VIEW);
    }

    /*-----------------------------------------------------*/ 
    /*                       CURSOS                        */
    /*-----------------------------------------------------*/

    function listAvisosCurso(idCurso) {
        const VIEW = 'ver_Avisos_Curso';
        const CLAUSE = `WHERE idCurso = ?`;
        return store.get(VIEW, CLAUSE, idCurso);
    }

    function listLinksCurso(idCurso) {
        const VIEW = 'ver_Recursos_Curso_Links';
        const CLAUSE = `WHERE idCurso = ?`;
        return store.get(VIEW, CLAUSE, idCurso);
    }

    function listDocumentosCurso(idCurso) {
        const VIEW = 'ver_Recursos_Curso_Documentos';
        const CLAUSE = `WHERE idCurso = ?`;
        return store.get(VIEW, CLAUSE, idCurso);
    }

    function getProximoCurso(idPonente) {
        const VIEW = 'ver_Proximo_Curso';
        const CLAUSE = 'WHERE ponente_id = ? LIMIT 1'

        return store.get(VIEW, CLAUSE, idPonente);
    }
        
    function listCursos() {
        const VIEW = 'ver_Datos_Cursos';
        return store.list(VIEW);
    }

    async function getHistorialCursosPonente(id) {
        const VIEW = 'ver_Historial_Cursos_Ponente';
        const CLAUSE = `WHERE idPonente = ?`;
        return store.get(VIEW, CLAUSE, id);
    }

    function getCurso(id) {
        const VIEW = 'ver_Datos_Cursos';
        const CLAUSE = `WHERE idCurso = ?`;
        return store.get(VIEW, CLAUSE, id);
    }

    function listAlumnos() {
        const VIEW = 'ver_Alumnos';
        return store.list(VIEW);
    }

    function listAsignacionesPonente(id) {
        const VIEW = 'ver_Asignaciones_Curso_Ponente';
        const CLAUSE = `WHERE idCurso = ?`;
        return store.get(VIEW, CLAUSE, id);
    }

    function reportarProblemaCurso(idUsuario, idCurso, asunto, descripcion){
        const PROCEDURE = `CALL agregar_Problemas_Curso(${idUsuario}, ${idCurso}, '${asunto}', '${descripcion}')`;
        return store.insert(PROCEDURE);
    }
    
    function reportarProblemaUsuario(idUsuario, asunto, descripcion){
        const PROCEDURE = `CALL agregar_Problemas_Usuario(${idUsuario}, '${asunto}', '${descripcion}')`;
        console.log("Problema reportado");
        return store.insert(PROCEDURE);
    }

    function getConsultarEstadoCursoPonente(usuarioID, cursoID) {
        const PROCEDURE = `CALL ver_Estado_Curso_Ponente(${usuarioID}, ${cursoID})`;
        return store.catalog(PROCEDURE);
    }

    function insertAviso(body) {
        const { idCurso, asuntoAviso, descripcionAviso } = body; 
        const PROCEDURE = `CALL agregar_Aviso(${idCurso}, '${asuntoAviso}','${descripcionAviso}')`
        return store.insert(PROCEDURE);
    }

    function insertEnlace(body) {
        const { idCurso, nombreLink, link } = body; 
        const PROCEDURE = `CALL agregar_Link(${idCurso}, '${nombreLink}','${link}')`
        return store.insert(PROCEDURE);
    }

    function listExamenesCurso(idCurso) {
        const VIEW = 'ver_Examenes';
        const CLAUSE = `WHERE idCurso = ?`;
        return store.list(VIEW, CLAUSE, idCurso);
    }

    function getArchivosTarea(idTarea) {
        const VIEW = 'ver_Archivos_Tarea';
        const CLAUSE = `WHERE idTarea = ?`;
        return store.list(VIEW, CLAUSE, idTarea);
    }

    function getArchivosTareaCurso(idCurso) {
        const VIEW = 'ver_Archivos_Tarea';
        const CLAUSE = `WHERE idCurso = ?`;
        return store.list(VIEW, CLAUSE, idCurso);
    }

    function insertArchivosMultimediaCurso(idCurso, nombreArchivo){
        const PROCEDURE = `CALL agregar_Archivos_Multimedia_Curso(${idCurso}, '${nombreArchivo}')`
        return store.insert(PROCEDURE);
    }

    function listPublicacionesCurso(idCurso) {
        const VIEW = 'ver_Historial_Publicaciones';
        const CLAUSE = `WHERE idCurso = ?`;
        return store.list(VIEW, CLAUSE, idCurso);
    }

    function getTiempoActual() {
        const VIEW = 'ver_Tiempo_Actual'
        return store.get(VIEW)
    }

    function catalogDatosGeneralesPonente(idPonente) {
        const PROCEDURE = `CALL ver_Datos_Generales_Ponente(${idPonente})`
        return store.catalog(PROCEDURE);
    }

    function getNombresCursosActualesPonente(idPonente) {
        const VIEW = 'ver_Nombres_Cursos_Actuales_Ponente'
        const CLAUSE = `WHERE idPonente = ?`;
        return store.get(VIEW, CLAUSE, idPonente)
    }

    function getTiempoActual() {
        const VIEW = 'ver_Tiempo_Actual'
        return store.get(VIEW)
    }

    function getMiPerfil(idUsuario) {
        const VIEW = 'ver_Usuarios';
        const CLAUSE = `WHERE idUsuario = ?`;
        return store.get(VIEW, CLAUSE, idUsuario);
    }

    function listAsignacionesPendientesPonente(idPonente) {
        const VIEW = 'ver_Asignaciones_Pendientes_Ponente';
        const CLAUSE = `WHERE idPonente = ? LIMIT 3`;
        return store.list(VIEW, CLAUSE, idPonente);
    }

    function catalogPermisosTarea(idPonente, idTarea) {
        const PROCEDURE = `CALL comprobar_Permisos_Tarea(${idPonente}, ${idTarea})`
        return store.catalog(PROCEDURE);
    }

    function listEstadoEntregasTarea(idTarea) {
        const VIEW = 'ver_Estado_Entregas_Tarea_Ponente';
        const CLAUSE = `WHERE idTarea = ?`;
        return store.list(VIEW, CLAUSE, idTarea);
    }

    function listArchivosEntregasTarea(idTarea) {
        const VIEW = 'ver_Archivos_Entregas_Tarea_Ponente';
        const CLAUSE = `WHERE idTarea = ?`;
        return store.list(VIEW, CLAUSE, idTarea);
    }

    function getDatosTarea(idTarea) {
        const VIEW = 'ver_Tareas_Ponente';
        const CLAUSE = `WHERE idTarea = ?`;
        return store.get(VIEW, CLAUSE, idTarea);
    }

    function listExamenesEditar(idCurso) { 
        const VIEW = 'ver_examenes_editar';
        const CLAUSE = `WHERE idExamen = ?`;
        return store.list(VIEW, CLAUSE, idCurso);
    }

function upsertDatosExamen(idExamen, body) {
        const {
            idCurso ,  nombreExamen, linkExamen,  horaAplicacionExamen, fechaAplicacionExamen

        } = body;

       
        const PROCEDURE = `CALL editar_examen(
            ${idExamen},  '${nombreExamen}',  '${linkExamen}',  '${fechaAplicacionExamen} ${horaAplicacionExamen}'

        )`

        return store.upsert(PROCEDURE);
    }

    function deleteExamen(idExamen) {
       console.log(idExamen);
        const PROCEDURE = `CALL eliminar_examen(
            ${idExamen}

        )`

        return store.upsert(PROCEDURE);
    }

  function listExamen(idCurso) { 
        const VIEW = 'ver_examenes_editar';
        const CLAUSE = `WHERE idCurso = ?`;
        return store.list(VIEW, CLAUSE, idCurso);
    }

    function upsertDatosAviso(idAviso, body) {
        const {
            asuntoAviso, descripcionAviso

        } = body;

       
        const PROCEDURE = `CALL editar_Aviso(
            ${idAviso},  '${asuntoAviso}',  '${descripcionAviso}'

        )`

        return store.upsert(PROCEDURE);
    }

    function deleteAvisos(idAviso) {
         const PROCEDURE = `CALL eliminar_Aviso(
             ${idAviso}
 
         )`
 
         return store.upsert(PROCEDURE);
     }


    function deleteDocumentos(idDocumento) {
         const PROCEDURE = `CALL eliminar_Documento(
             ${idDocumento}
 
         )`
 
         return store.upsert(PROCEDURE);
     }

     function deleteLinks(idLink) {
        const PROCEDURE = `CALL eliminar_Link(
            ${idLink}

        )`

        return store.upsert(PROCEDURE);
    }

    function upsertDatosLinks(idLink, body) {
        const {
            nombreLink, link

        } = body;

       
        const PROCEDURE = `CALL editar_Link(
            ${idLink},  '${nombreLink}',  '${link}'

        )`

        return store.upsert(PROCEDURE);
    }


    function getMensajeBienvenida(){
        const numeroAleatoreo = parseInt(Math.random() * (0 - mensajes.length)* -1);
        return mensajes[numeroAleatoreo];
    }

    return {
        insertTarea,
        insertExamen,
        listAlumnos,
        listCursos,
        getHistorialCursosPonente,
        getCurso,
        listAvisosCurso,
        listLinksCurso,
        listDocumentosCurso,
        listCursosActuales,
        insertMultimediaTarea,
        listAlumnos,
        listCursos,
        //listCursosActivos,
        getUltimaTarea,
        getProximoCurso,
        listAsignacionesPonente,
        reportarProblemaCurso,
        reportarProblemaUsuario,
        getConsultarEstadoCursoPonente,
        insertAviso,
        insertEnlace,
        listExamenesCurso,
        getArchivosTarea,
        getArchivosTareaCurso,
        insertArchivosMultimediaCurso,
        listPublicacionesCurso,
        getTiempoActual,
        catalogDatosGeneralesPonente,
        getNombresCursosActualesPonente,
        getMiPerfil,
        listAsignacionesPendientesPonente,
        catalogPermisosTarea,
        listEstadoEntregasTarea,
        listArchivosEntregasTarea,
        getDatosTarea,
        upsertDatosExamen,
        listExamenesEditar,
        deleteExamen,
        listExamen,
        upsertDatosAviso,
        deleteAvisos,
        deleteDocumentos,
        deleteLinks,
        upsertDatosLinks,
        getMensajeBienvenida,
    };
}