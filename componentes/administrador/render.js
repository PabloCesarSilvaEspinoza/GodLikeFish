const Controller = require('./index');
const fs = require('fs');
const administrador = require('./index');
const { Console } = require('console');

path = require('path')

module.exports = {

    getDashboardAdministrador: async function (req, res, next) {
        const errores = await Controller.listErrores();
        const numeroErrores = errores.length;
        res.render('administrador/d1_dashboard_v2', {
            administrador: true,
            graficasAdministrador : true,
            valores:[{
            valor1: 18,
            valor2: 36,
            valor3: 10
            }],
            errores,
            numeroErrores,
        });
    },

    getAdministrarCursos: async function (req, res, next) {
        const cursos = await Controller.listCursos(1);
        const hitorialCursos = await Controller.listHitorialCursos();
        const registrados= await Controller.listRegistrados();
        const activos= await Controller.listActivos();
        const inactivos= await Controller.listInactivos();
        const tarjetas= await Controller.listUsuariosEnSistemaTarjeta();
        const ponentes = await Controller.listPonentes();
        const areas = await Controller.listAreas();
        const fechaActual = await Controller.getTiempoActual();

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

        });
    },
    
    getAdministrarUsuarios: async function (req, res, next) {
        const datosUsuarioEnSistema= await Controller.listUsuariosEnSistema(); 
        const tarjetas= await Controller.listUsuariosEnSistemaTarjeta();
        const verPerfil= await Controller.listPerfilUsuario();
        const registrados= await Controller.listRegistrados();
        const activos= await Controller.listActivos();
        const inactivos= await Controller.listInactivos();
        res.render('administrador/d3_administrarUsuarios', {
            administrador: true,
            datatables:true,
            dataTablesExport:true,
            graficasAdministrador : true,
            valores:[{
            valor1: 18,
            valor2: 36,
            valor3: 10
            }],
            caladon:true,
            datosUsuarioEnSistema,
            tarjetas,
            verPerfil,
            activos,
            inactivos,
            registrados,

        });
    },

    getConsultarCursoE1: async function (req, res, next) {
        res.render('administrador/d4_consultarCursoE1', {
            administrador: true
        });
    },

    getConsultarCursoE2: async function (req, res, next) {
        res.render('administrador/d4_consultarCursoE2', {
            administrador: true
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

    /*putEditarCurso: async function (req, res, next) {
        await Controller.updateCurso(req.body);
        res.redirect('administrador/consultarCursosEI/:id');
    },
    getEditarCurso: async function (req, res, next) {
        res.render('administrador/d6_editarCurso', {
            administrador: true
        });
    },

    postEditarUsuario: async function (req, res, next){
        await Controller.upsertDatosUsuario(req.params.id, req.body);        

        res.redirect('/administrador/administrarUsuarios')
    },*/

    getEditarUsuario: async function(req, res, next){
        const paises = await Controller.listPaises();
        const puestos = await Controller.listPuestos();
        const municipios =await Controller.listMunicipios();
        const datosUsuario = await Controller.getUsuarioEditar(req.params.id);
        const nombre = datosUsuario[0].nombre;
        const apellidoPaterno = datosUsuario[0].apellidoPaterno;
        const apellidoMaterno = datosUsuario[0].apellidoMaterno;
        const idPais = datosUsuario[0].idPais;
        const paisNacimiento = datosUsuario[0].paisNacimiento;
        const idMunicipio = datosUsuario[0].idMunicipio;
        const municipioNacimiento = datosUsuario[0].municipioNacimiento;
        const fechaNacimiento = datosUsuario[0].fechaNacimiento;
        const idMunicipioResidencia = datosUsuario[0].idMunicipioResidencia;
        const municipioResidencia = datosUsuario[0].municipioResidencia;
        const colonia = datosUsuario[0].colonia;
        const calle = datosUsuario[0].calle;
        const numeroExterior = datosUsuario[0].numeroExterior;
        const numeroInterior = datosUsuario[0].numeroInterior;
        const matriculaUsuario = datosUsuario[0].matriculaUsuario;
        const fechaInicioLabores = datosUsuario[0].fechaInicioLabores;
        const idPuesto = datosUsuario[0].idPuesto;
        const puesto = datosUsuario[0].puesto;
        const idArea = datosUsuario[0].idArea;
        const area = datosUsuario[0].area;
        const tarjeton = datosUsuario[0].tarjeton;
        const estadoUsuario = datosUsuario[0].estado;
        const idUsuario = datosUsuario[0].idUsuario;
        const idDomicilio = datosUsuario[0].idDomicilio;
        const activo = datosUsuario[0].activo;

        res.render('administrador/d5_editarUsuario',{
            administrador: true,
            switch: true,
            nombre,
            apellidoPaterno,
            apellidoMaterno,
            idPais,
            paisNacimiento,
            paises,
            idMunicipio,
            municipioNacimiento,
            municipios,
            fechaNacimiento,
            idMunicipioResidencia,
            municipioResidencia,
            colonia,
            calle,
            numeroExterior,
            numeroInterior,
            matriculaUsuario,
            fechaInicioLabores,
            idPuesto,
            puesto,
            puestos,
            idArea,
            area,
            tarjeton,
            estadoUsuario,
            idUsuario,
            idDomicilio,
            activo,
        });
    },

    postResolverProblema: async function(req, res, next){
        await Controller.upsertResolverProblema(req.body.idProblema, req.params.tipoProblema)
        res.redirect('back');
    },
};