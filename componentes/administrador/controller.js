const { response } = require('express');
const ControllerAuth = require('../auth/index');
const mensajes = ["Estas de vuelta","Hola","¿Que tal?","Estas aquí","Volviste","Regresaste"];
module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../store/mysql'); 
    }
    /*-----------------------------------------------------*/ 
    /*                      DASHBOARD                      */
    /*-----------------------------------------------------*/

    function listErrores(){
        const VIEW = 'ver_Reporte_Errores';
        return store.list(VIEW)
    }
    

    function upsertResolverProblema(idProblema, tipoProblema){
        const PROCEDURE = `CALL resolver_Problema(${idProblema}, ${tipoProblema})`
        return store.upsert(PROCEDURE);
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
            tipoCurso, modalidadCurso, capacidadCurso, enlacePlataforma, ponenteID  
        } = body;

        const PROCEDURE = `CALL agregar_Curso(
            '${nombreCurso}','${claveCurso}','${descripcionCurso}', '${fechaInicioCurso}','${fechaFinCurso}','${horarioInicioCurso}',
            '${horarioFinCurso}','${fechaInscripcionInicioCurso}','${fechaInscripcionFinCurso}','${plataformaCurso}', ${areaCurso},
            '${tipoCurso}','${modalidadCurso}', ${capacidadCurso}, '${enlacePlataforma}', ${ponenteID}
        )`
        
        return store.upsert(PROCEDURE);
    }

    function getFotoCurso(idCurso) {
        const VIEW = 'ver_Fotos_Cursos';
        const CLAUSE = `WHERE idCurso = ?`;
        return store.get(VIEW, CLAUSE, idCurso);
    }

    function updateCurso(id, body) {
        const {
            nombreCurso, clave, descripcion, fechaInicio, fechaFin, horaInicio, 
            horaFin, inscripcionInicio, inscripcionFin, plataforma,
            area, tipo, modalidad, capacidad,
            enlace, ponente
        } = body;

        const PROCEDURE = `CALL editar_Curso( 
            ${id}, '${nombreCurso}', '${clave}', '${descripcion}', '${fechaInicio}', '${fechaFin}',
            '${horaInicio}', '${horaFin}', '${inscripcionInicio}', '${inscripcionFin}', '${plataforma}',
            '${area}','${tipo}', '${modalidad}', ${capacidad},
            '${enlace}', ${ponente}
            )`

        return store.upsert(PROCEDURE);
    }

    function updateFotoCurso(idCurso, fotoCurso){
        const PROCEDURE = `CALL editar_Foto(${idCurso}, '${fotoCurso}')`

        return store.upsert(PROCEDURE);
    }

    function updateTemarioCurso(id, temario){
        console.log(id+' '+temario)
        const PROCEDURE = `CALL editar_Temario(${id}, '${temario}')`

        return store.upsert(PROCEDURE);
    }

    function updateEstadoCurso(id, estado){
        const PROCEDURE = `CALL cambiar_Estado_Curso(${id}, ${estado})`
        console.log(PROCEDURE);
        return store.upsert(PROCEDURE);
    }

    function updateEstadoUsuario(id, estado){
        console.log(id+'asdadshbdjasbdhasbdj'+estado)
        const PROCEDURE = `CALL cambiar_Estado_Usuario(${id}, ${estado})`

        return store.upsert(PROCEDURE);
    }

    function insertMultimediaCurso(cursoID, temarioCurso, fotoCurso) {
        const PROCEDURE = `CALL agregar_Multimedia_Curso( ${cursoID},  '${temarioCurso}', '${fotoCurso}' )`

        return store.upsert(PROCEDURE);
    }

    function getTiempoActual() {
        const VIEW = 'ver_Tiempo_Actual'

        return store.get(VIEW)
    }

    /*-----------------------------------------------------*/ 
    /*                         AREAS                       */
    /*-----------------------------------------------------*/

    function listAreas(){
        const VIEW = 'ver_Areas';
        return store.list(VIEW)
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
    function listCursosActivosTotal() {
        const VIEW = 'ver_totalCursoActivos';
        return store.list(VIEW);
    }
    function listCursosInactivosTotal() {
        const VIEW = 'ver_totalCursoInactivos';
        return store.list(VIEW);
    }
    function listUsuariosActivosTotal() {
        const VIEW = 'ver_totalUsuariosActivos';
        return store.list(VIEW);
    }
    function listUsuariosInactivosTotal() {
        const VIEW = 'ver_totalUsuariosInactivos';
        return store.list(VIEW);
    }
    function listUsuariosEncursoTotal() {
        const VIEW = 'ver_totalUsuariosEncurso';
        return store.list(VIEW);
    }
    function listUsuariosReconocimientoTotal() {
        const VIEW = 'ver_totalUsuariosReconocimiento';
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

    function listHitorialCursos() {
        const VIEW = 'ver_Historial_Cursos';
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

    function upsertDatosUsuario(id, body) {
        const {
            municipioResidenciaID, colonia, calle, numeroExt, nombres, pApellido, sApellido, 
            matricula, fechaNacimiento, paisNacimientoID, municipioNacimientoID, area, puesto, antiguedad
        } = body;

        let numeroInt;
        (body.numeroInt == '')
            ? numeroInt = null
            : numeroInt = body.numeroInt;

        const PROCEDURE = `CALL editar_Usuario(
            ${id}, ${municipioResidenciaID}, '${colonia}', '${calle}', ${numeroExt}, ${numeroInt}, '${nombres}', '${pApellido}', '${sApellido}',
            '${matricula}', '${fechaNacimiento}', ${paisNacimientoID}, ${municipioNacimientoID}, '${area}', '${puesto}',
            '${antiguedad}'
        )`

        return store.upsert(PROCEDURE);
    }

    function listPonentes() {
        const VIEW = 'ver_Ponentes';
        return store.list(VIEW);
    }

    function listAcreedoresDiplomas() {
        const VIEW = 'ver_acreedores_diplomas';
        return store.list(VIEW);
    }

    function desactivarCursoUsuario(idUsuario,idCursoActual) {
        console.log(idUsuario);
        console.log(idCursoActual);

        const PROCEDURE = `CALL eliminar_Estudiante_Curso(
            ${idUsuario}, ${idCursoActual}

        )`

        return store.upsert(PROCEDURE);
    }

    function UsuariosSinVerificar() {
        const VIEW = 'ver_Usuarios_Sin_Verificar';
        return store.list(VIEW);
    }

    function updateVerificarTarjetonUsuario(usuarioID) {
        const PROCEDURE = `CALL verificar_Tarjeton_Usuario(${usuarioID})`
        return store.upsert(PROCEDURE);
    }

    function getCurso(idCurso) {
        const VIEW = 'ver_Datos_Cursos';
        const CLAUSE = `WHERE idCurso = ?`;
        return store.get(VIEW, CLAUSE, idCurso);
    }
    function totalCursoAprobadoEstudiante(idUsuario) {
        const VIEW = 'ver_Cursos_Estudiantes_Total_Aprobados';
        const CLAUSE = `WHERE idUsuario = ?`;
        return store.get(VIEW, CLAUSE, idUsuario);
    }
    function totalCursoReprobadoEstudiante(idUsuario) {
        const VIEW = 'ver_Cursos_Estudiantes_Total_Reprobados';
        const CLAUSE = `WHERE idUsuario = ?`;
        return store.get(VIEW, CLAUSE, idUsuario);
    }
    function totalCursoEstudiante(idUsuario) {
        const VIEW = 'ver_Cursos_Estudiantes_Total';
        const CLAUSE = `WHERE idUsuario = ?`;
        return store.get(VIEW, CLAUSE, idUsuario);
    }

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

    function listAsignacionesCurso(idCurso) {
        const VIEW = 'ver_Asignaciones_Curso_Ponente';
        const CLAUSE = `WHERE idCurso = ?`;
        return store.get(VIEW, CLAUSE, idCurso);
    }

    function getArchivosTareaCurso(idCurso) {
        const VIEW = 'ver_Archivos_Tarea';
        const CLAUSE = `WHERE idCurso = ?`;
        return store.list(VIEW, CLAUSE, idCurso);
    }

    function listExamenesCurso(idCurso) {
        const VIEW = 'ver_Examenes';
        const CLAUSE = `WHERE idCurso = ?`;
        return store.list(VIEW, CLAUSE, idCurso);
    }

    function listPublicacionesCurso(idCurso) {
        const VIEW = 'ver_Historial_Publicaciones';
        const CLAUSE = `WHERE idCurso = ?`;
        return store.list(VIEW, CLAUSE, idCurso);
    }
    function listTotalProblemasCurso(idCurso) {
        const VIEW = 'ver_totalProblemasCurso';
        const CLAUSE = `WHERE idCurso = ?`;
        return store.list(VIEW, CLAUSE, idCurso);
    }
    function listTotalExamenesCurso(idCurso) {
        const VIEW = 'ver_totalExamenesCurso';
        const CLAUSE = `WHERE idCurso = ?`;
        return store.list(VIEW, CLAUSE, idCurso);
    }
    function listTotalAvisosCurso(idCurso) {
        const VIEW = 'ver_totalAvisosCurso';
        const CLAUSE = `WHERE idCurso = ?`;
        return store.list(VIEW, CLAUSE, idCurso);
    }
    function listTotalRecursosCurso(idCurso) {
        const VIEW = 'ver_totalRecursosCurso';
        const CLAUSE = `WHERE idCurso = ?`;
        return store.list(VIEW, CLAUSE, idCurso);
    }    
    function getMiPerfil(idUsuario) {
        const VIEW = 'ver_Usuarios';
        const CLAUSE = `WHERE idUsuario = ?`;
        return store.get(VIEW, CLAUSE, idUsuario);
    }

    function enviarCorreo(idUsuario, asunto, contenido) {
        ControllerAuth.correoPersonal(idUsuario, asunto, contenido);
    }

    function getMensajeBienvenida(){
        const numeroAleatoreo = parseInt(Math.random() * (0 - mensajes.length)* -1);
        return mensajes[numeroAleatoreo];
    }
    
    function getCalificacionesCurso(idCurso) {
        const VIEW = 'ver_Calificaciones_Curso';
        const CLAUSE = `WHERE idCurso = ?`;
        return store.get(VIEW, CLAUSE, idCurso);
    }

    function listCalificacionesEstudiantes(idCurso) {
        const VIEW = 'ver_Calificaciones_Estudiantes';
        const CLAUSE = `WHERE idCurso = ?`;
        return store.list(VIEW, CLAUSE, idCurso);
    }

    function listEstudiantesInscritos(idCurso) {
        const VIEW = 'ver_Estudiantes_Inscritos';
        const CLAUSE = `WHERE idCurso = ?`;
        return store.list(VIEW, CLAUSE, idCurso);
    }

    function listUsuariosAdministrador() {
        const VIEW = 'ver_Usuarios_Administrador';
        return store.list(VIEW);
    }

    function listUsuariosSuperAdministrador() {
        const VIEW = 'ver_Usuarios_SuperAdministrador';
        return store.list(VIEW);
    }

    function getRolUsuario(idUsuario) {
        const VIEW = 'ver_Roles_Usuarios';
        const CLAUSE = `WHERE idUsuario = ?`;
        return store.get(VIEW, CLAUSE, idUsuario);
    }

    function getPerfilUsuario(idUsuario) {
        const VIEW = 'ver_Calificaciones_Curso';
        const CLAUSE = `WHERE idCurso = ?`;
        return store.get(VIEW, CLAUSE, idUsuario);
    }

    function getEstudiante(idEstudiante) {
        const VIEW = 'ver_Estudiantes';
        const CLAUSE = 'WHERE idEstudiante = ? LIMIT 1'
        return store.get(VIEW, CLAUSE, idEstudiante);
    }

    function getCursoActualEstudiante(idEstudiante) {
        const VIEW = 'ver_Curso_Actual_Estudiante';
        const CLAUSE = `WHERE idEstudiante = ?`;
        return store.get(VIEW, CLAUSE, idEstudiante);
    }

    function listCursosAprobadosEstudiante(idEstudiante) {
        const VIEW = 'ver_Cursos_Aprobados_Estudiante';
        const CLAUSE = `WHERE idEstudiante = ?`;
        return store.list(VIEW, CLAUSE, idEstudiante);
    }

    function listCursosReprobadosEstudiante(idEstudiante) {
        const VIEW = 'ver_Cursos_Reprobados_Estudiante';
        const CLAUSE = `WHERE idEstudiante = ?`;
        return store.list(VIEW, CLAUSE, idEstudiante);
    }

    function catalogCursosDisponiblesEstudiante(idEstudiante) {
        const PROCEDURE = `CALL ver_Cursos_Disponibles_Estudiante(${idEstudiante})`
        return store.catalog(PROCEDURE)
    }

    function getPonente(idPonente) {
        const VIEW = 'ver_Ponentes_Administrador';
        const CLAUSE = 'WHERE idPonente = ? LIMIT 1'
        return store.get(VIEW, CLAUSE, idPonente);
    }

    function listCursosActualesPonente(idPonente) {
        const VIEW = 'ver_Cursos_Actuales_Ponente';
        const CLAUSE = `WHERE idPonente = ?`;
        return store.list(VIEW, CLAUSE, idPonente);
    }

    function listCursosPasadosPonente(idPonente) {
        const VIEW = 'ver_Cursos_Pasados_Ponente';
        const CLAUSE = `WHERE idPonente = ?`;
        return store.list(VIEW, CLAUSE, idPonente);
    }

    function getAdministrador(idAdministrador) {
        const VIEW = 'ver_Administradores';
        const CLAUSE = 'WHERE idAdministrador = ? LIMIT 1'
        return store.get(VIEW, CLAUSE, idAdministrador);
    }

    function getCursoEditar(id) {
        const VIEW = 'ver_Datos_Curso_Editar';
        const CLAUSE = `WHERE cursoId = ?`;
        return store.get(VIEW, CLAUSE, id);
    }

    function getTemario(cursoID) {
        const VIEW = 'ver_Temario_Curso';
        const CLAUSE = `WHERE cursoID = ?`;
        return store.get(VIEW, CLAUSE, cursoID);
    }

    function getPerfilPonente(cursoID) {
        const VIEW = 'ver_Perfil_Ponente';
        const CLAUSE = `WHERE idCurso = ?`;
        return store.get(VIEW, CLAUSE, cursoID);
    }

    function upsertCambiarRol(idUsuario, rolUsuario){
        const PROCEDURE = `CALL cambiar_Rol_Usuario(${idUsuario}, '${rolUsuario}')`;
        console.log(PROCEDURE);
        return store.upsert(PROCEDURE)
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
        getUsuarioEditar,
        listPaises,
        listMunicipios,
        listEstados,
        listPuestos,
        upsertDatosUsuario,
        getUsuario,
        listPonentes,
        listAreas,
        getTiempoActual,
        listErrores,
        upsertResolverProblema,
        updateCurso,
        UsuariosSinVerificar,
        updateVerificarTarjetonUsuario,
        listAvisosCurso,
        listLinksCurso,
        listDocumentosCurso,
        getArchivosTareaCurso,
        listAsignacionesCurso,
        listExamenesCurso,
        listPublicacionesCurso,
        getCurso,
        getMiPerfil,
        enviarCorreo,
        getMensajeBienvenida,
        listCursosActivosTotal,
        listCursosInactivosTotal,
        listUsuariosActivosTotal,
        listUsuariosInactivosTotal,
        listUsuariosEncursoTotal,
        listUsuariosReconocimientoTotal,
        listTotalProblemasCurso,
        listTotalExamenesCurso,
        listTotalAvisosCurso,
        listTotalRecursosCurso,
        getCalificacionesCurso,
        listCalificacionesEstudiantes,
        listEstudiantesInscritos,
        listUsuariosAdministrador,
        listUsuariosSuperAdministrador,
        getRolUsuario,
        desactivarCursoUsuario,
        totalCursoAprobadoEstudiante,
        totalCursoReprobadoEstudiante,
        totalCursoEstudiante,
        getFotoCurso,
        updateFotoCurso,
        updateTemarioCurso,
        updateEstadoCurso,
        updateEstadoUsuario,
        getEstudiante,
        getCursoActualEstudiante,
        listCursosAprobadosEstudiante,
        listCursosReprobadosEstudiante,
        catalogCursosDisponiblesEstudiante,
        getPonente,
        listCursosActualesPonente,
        listCursosPasadosPonente,
        getAdministrador,
        getCursoEditar,
        getTemario,
        getPerfilPonente,
        upsertCambiarRol
    };
}