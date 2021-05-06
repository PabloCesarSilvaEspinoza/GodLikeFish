const student = require('./index');
const Controller = require('./index');

module.exports = {
    getVerTareas:async function(req, res, next){
        const courses= await Controller.list();
     },

    getVerTarea: async function(req, res, next){
        const id = req.params.id;
        const course = await Controller.get(id);
        res.redirect('/');
    },

    postAgregarTarea: async function(req, res, next){
        await Controller.insert(req.body);
       res.redirect('/');
    },

    putEditarTarea: async function(req, res, next){
        await Controller.update(req.body);
       res.redirect('/');
    },


};