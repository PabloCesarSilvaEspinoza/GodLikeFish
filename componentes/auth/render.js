const Controller = require('./index');

module.exports = {
    getPaginaPrincipal: async function(req, res, next){
        
        const paises = await Controller.listPaises();
        const estados = await Controller.listEstados();
        const municipios = await Controller.listMunicipios();
        const puestos = await Controller.listPuestos();
        res.render('general/paginaPrincipal',{
            general: true,
            pickadate: true,
            select2: true,
            paises,
            municipios,
            estados,
            puestos,
        });
    },
    getConfirmarCorreo: async function(req, res, next){
        res.render('general/confirmarCorreo',{
            general: true
        });
    },
    postAgregarUsuario: async function (req, res, next){
        const respuestaBD = await Controller.insertUsuario(req.body);
        const usuarioID = respuestaBD[0][0].ID;

        let fotoUsuario
        (req.files.fotoUsuario)
            ? fotoUsuario = `${usuarioID}/${req.files.fotoUsuario[0].originalname}`
            : fotoUsuario = '';

        const tarjetonUsuario = `${usuarioID}/${req.files.tarjetonUsuario[0].originalname}`;
        console.log(usuarioID + fotoUsuario + tarjetonUsuario);
        await Controller.insertMultimediaUsuario(usuarioID, fotoUsuario, tarjetonUsuario)
        res.redirect('/')
    },
};