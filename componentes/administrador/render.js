const Controller = require('./index');
const fs = require('fs');
const administrador = require('./index');
const { Console } = require('console');
const superAdministrador = false;

path = require('path')

module.exports = {

    getDashboardAdministrador: async function (req, res, next) {
        const miPerfil = await Controller.getMiPerfil(req.user.id);
        const errores = await Controller.listErrores();
        const valores = await Controller.listCursosActivosTotal();
        const valoresina = await Controller.listCursosInactivosTotal();
        const valoresUact = await Controller.listUsuariosActivosTotal();
        const valoresUinact = await Controller.listUsuariosInactivosTotal();
        const valoresUcurso = await Controller.listUsuariosEncursoTotal();
        const valoresUrecono = await Controller.listUsuariosReconocimientoTotal();
        const usuariosSinVerificar = await Controller.UsuariosSinVerificar();
        const mensaje = await Controller.getMensajeBienvenida();
        const numeroUsuariosSinVerificar = usuariosSinVerificar.length;
        /* (req.user.rol == "Super-Administrador" ? superAdministrador = true : superAdministrador = false) */
        res.render('administrador/d1_dashboard', {
            administrador: true,
            graficasAdministrador : true,
            errores,
            valores,
            valoresina,
            valoresUact,
            valoresUinact,
            valoresUcurso,
            valoresUrecono,
            numeroErrores,
            usuariosSinVerificar,
            miPerfil,
            mensaje,
            numeroUsuariosSinVerificar,
        });
    },
    getAdministrarCursos: async function (req, res, next) {
        const cursos = await Controller.listCursos();
        const hitorialCursos = await Controller.listHitorialCursos();
        const registrados= await Controller.listRegistrados();
        const activos= await Controller.listActivos();
        const inactivos= await Controller.listInactivos();
        const tarjetas= await Controller.listUsuariosEnSistemaTarjeta();
        const ponentes = await Controller.listPonentes();
        const areas = await Controller.listAreas();
        const fechaActual = await Controller.getTiempoActual();
        const miPerfil = await Controller.getMiPerfil(req.user.id);

        res.render('administrador/d2_administrarCursos', {
            administrador: true,
            datatables:true,
            dataTablesExport:true,
            cursos,
            hitorialCursos,
            ponentes,
            areas,
            fechaActual,
            graficasAdministrador : true,
            valores:[{
            valor1: 18,
            valor2: 36,
            valor3: 10
            }],
            activos,
            inactivos,
            tarjetas,
            registrados,
            miPerfil

        });
    },

    postDesactivarCursoUsuario: async function (req, res, next) {
        console.log(req.params.idUsuario);
        console.log(req.params.idCursoActual);
        await Controller.desactivarCursoUsuario(req.params.idUsuario, req.params.idCursoActual);     
        res.redirect('back');
    },
    
    getAdministrarUsuarios: async function (req, res, next) {
        const datosUsuarioEnSistema= await Controller.listUsuariosEnSistema(); 
        const tarjetas= await Controller.listUsuariosEnSistemaTarjeta();
        const verPerfil= await Controller.listPerfilUsuario();
        const respuestaRegistrados= await Controller.listRegistrados();
        const respuestaActivos= await Controller.listActivos();
        const respuestaInactivos= await Controller.listInactivos();
        const registrados = respuestaRegistrados[0];
        const activos = respuestaActivos[0];
        const inactivos = respuestaInactivos[0];
        const usuarios = (req.user.rol == 'Administrador')
                        ? await Controller.listUsuariosAdministrador()
                        : await Controller.listUsuariosSuperAdministrador();
        const miPerfil = await Controller.getMiPerfil(req.user.id);
        res.render('administrador/d3_administrarUsuarios', {
            administrador: true,
            datatables:true,
            dataTablesExport:true,
            caladon:true,
            datosUsuarioEnSistema,
            tarjetas,
            verPerfil,
            activos,
            inactivos,
            registrados,
            usuarios,
            miPerfil 
        });
    },

    getConsultarCurso: async function (req, res, next) {
        const cursoID = req.params.idCurso;
        const datosCurso = await Controller.getCurso(cursoID);
        const curso = datosCurso[0];
        const activo = datosCurso[0].activoCurso;
        const avisosCurso = await Controller.listAvisosCurso(cursoID);
        const linksCurso = await Controller.listLinksCurso(cursoID);
        const documentosCurso = await Controller.listDocumentosCurso(cursoID);
        const asignacionesCurso = await Controller.listAsignacionesCurso(cursoID);
        const archivosAsignacionesCurso = await Controller.getArchivosTareaCurso(cursoID);
        const examenesCurso = await Controller.listExamenesCurso(cursoID);
        const publicacionesCurso = await Controller.listPublicacionesCurso(cursoID);
        const totalProblemasCurso = await Controller.listTotalProblemasCurso(cursoID);
        const totalExamenesCurso = await Controller.listTotalExamenesCurso(cursoID);
        const totalAvisosCurso = await Controller.listTotalAvisosCurso(cursoID);
        const totalRecursosCurso = await Controller.listTotalRecursosCurso(cursoID);
        const totalDocumentos = documentosCurso.length;
        const totalLinks = linksCurso.length;
        const respuestaCalificacionesCurso = await Controller.getCalificacionesCurso(cursoID);
        const calificacionesCurso = respuestaCalificacionesCurso[0];
        const calificacionesEstudiantes = await Controller.listCalificacionesEstudiantes(cursoID);
        const estudiantesInscritos = await Controller.listEstudiantesInscritos(cursoID);
        const miPerfil = await Controller.getMiPerfil(req.user.id);
        const datosEditarCurso = await Controller.getCursoEditar(cursoID)
        const datosCursoEd = datosEditarCurso[0];
        const ponentes = await Controller.listPonentes();
        const areas = await Controller.listAreas();
        
        res.render('administrador/d4_consultarCurso', {
            administrador: true,
            graficasAdministrador : true,
            curso,
            datosCurso,
            avisosCurso,
            linksCurso,
            documentosCurso,
            asignacionesCurso,
            archivosAsignacionesCurso,
            examenesCurso,
            publicacionesCurso,
            totalDocumentos,
            totalLinks,
            totalProblemasCurso,
            totalExamenesCurso,
            totalAvisosCurso,
            totalRecursosCurso,
            miPerfil,
            calificacionesCurso,
            calificacionesEstudiantes,
            estudiantesInscritos,
            miPerfil,
            datosCursoEd,
            ponentes,
            areas,
            activo
        });
    },

    postAgregarCurso: async function (req, res, next){
        const respuestaBD = await Controller.insertCurso(req.body);
        const cursoID = respuestaBD[0][0].ID;
        const fotoCurso = `${req.files.fotoCurso[0].originalname}`;
        const temarioCurso = `${req.files.temarioCurso[0].originalname}`;
        await Controller.insertMultimediaCurso(cursoID, temarioCurso, fotoCurso)
        res.redirect('/administrador/administrarCursos')
    },

    postEditarCurso: async function (req, res, next) {
        await Controller.updateCurso(req.params.idCurso, req.body);
        res.redirect('back');
    },

    postEditarEstadoCurso: async function (req, res, next) {
        await Controller.updateEstadoCurso(req.params.idUsuario, req.params.estado);
        res.redirect('back');
    },

    postEditarEstadoUsuario: async function (req, res, next) {
        await Controller.updateEstadoUsuario(req.params.idUsuario, req.params.estado);
        res.redirect('back');
    },

    postEditarFotoCurso: async function (req, res, next) {
        const foto = `${req.file.originalname}`;
        await Controller.updateFotoCurso(req.params.idCurso, foto)
        res.redirect('back');
    },

    postEditarTemarioCurso: async function (req, res, next) {
        const temario = `${req.file.originalname}`;
        await Controller.updateTemarioCurso(req.params.idCurso, temario)
        res.redirect('back');
    },
    postEditarUsuario: async function (req, res, next){
        await Controller.upsertDatosUsuario(req.params.id, req.body);        

        res.redirect('#')
    },

    postResolverProblema: async function(req, res, next){
        await Controller.upsertResolverProblema(req.body.idProblema, req.params.tipoProblema)
        res.redirect('back');
    },

    getDescargarTarjetonUsuario: async function (req, res, next) {
        const usuarioID = req.params.idUsuario;
        const tarjetonNombre = req.params.nombreTarjeton;
        const raiz = path.join(__dirname, '../../public/assets/multimedia/usuarios');
        const archivoRuta = `${raiz}/${usuarioID}/${tarjetonNombre}`;
        res.download(archivoRuta)
    },

    postVerificarTarjetonUsuario: async function (req, res, next) {
        const { idUsuario } = req.body;
        await Controller.updateVerificarTarjetonUsuario(idUsuario);
        res.redirect('back');
    },

    postCorreoPersonalizado: async function(req, res, next){
        Controller.enviarCorreo(idUsuario,asunto,mensaje);
        res.redirect('/validarPermisos'); /* regresa a dashboard, modificar */
    },

    getPerfilUsuario: async function (req, res, next) {
        const usuarioID = req.params.idUsuario;
        const rolUsuario = await Controller.getRolUsuario(usuarioID);
        const totalCursoAprobado = await Controller.totalCursoAprobadoEstudiante(usuarioID);
        const totalCursoReprobado = await Controller.totalCursoReprobadoEstudiante(usuarioID);
        const totalCurso = await Controller.totalCursoEstudiante(usuarioID);
        const rol = rolUsuario[0].rolUsuario;
        const paises = await Controller.listPaises();
        const puestos = await Controller.listPuestos();
        const municipios =await Controller.listMunicipios();
        const datosUsuario = await Controller.getUsuarioEditar(req.params.idUsuario);
        const datos = datosUsuario[0];
        const areas = await Controller.listAreas();

        console.log(datos.activo)

        switch (rol) {
            case 'Estudiante':
                res.render('administrador/d5_administrarUsuario_E1', {
                    administrador: true,
                    graficasAdministrador : true,
                    totalCursoAprobado,
                    totalCursoReprobado,
                    totalCurso,
                    paises,
                    puestos,
                    municipios,
                    datos,
                    areas
                })
                break;
            case 'Ponente':
                res.render('administrador/d5_administrarUsuario_E2', {
                    administrador: true,
                    paises,
                    puestos,
                    municipios,
                    datos,
                    areas
                })
                break;
            case 'Administrador':
            case 'Super-Administrador':
                (req.user.rol == 'Super-Administrador')
                ? res.render('administrador/d5_administrarUsuario_E3', {
                    administrador: true,
                    paises,
                    puestos,
                    municipios,
                    datos,
                    areas
                })
                : res.redirect('/administrador/dashboardAdministrador');
                break;
            default:
                res.redirect('/administrador/dashboardAdministrador');
                break;
        }
    },
};