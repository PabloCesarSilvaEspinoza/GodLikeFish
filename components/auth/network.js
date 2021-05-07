const express = require('express');

const response = require('../../network/response');
const Controller = require('./index');

const router = express.Router();

router.post('/dashboard', function(req,res){
    Controller.login(req.body.correo, req.body.password)
        .then(token => {
            response.success(req, res, token, 200);
        })
        .catch(error => {
            response.error(req, res, 'Informacion invalida', 400);
        })
})
/*
router.post('/login', function(req,res){
    Controller.login(req.body.correo, req.body.password)
        .then(token => {
            response.success(req, res, token, 200);
        })
        .catch(error => {
            response.error(req, res, 'Informacion invalida', 400);
        })
})*/

module.exports = router;
