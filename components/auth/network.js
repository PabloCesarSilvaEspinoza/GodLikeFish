const express = require('express');
const render = require('./render');
const response = require('../../network/response');
const Controller = require('./index');

const router = express.Router();

router.get('/', render.postPaginaPrincipal);
router.get('/confirmarCorreo', render.postConfirmarCorreo);

router.post('/login', function(req,res){
    console.log(req.body);
    Controller.login(req.body.correoUsuario, req.body.passwordUsuario)
        .then(token => {
            response.success(req, res, token, 200);
        })
        .catch(error => {
            response.error(req, res, 'Informacion invalida', 400);
        })
});


module.exports = router;
