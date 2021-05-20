module.exports = {
    verificar (req, res, next) {
        //console.log(req.body);
        if (req.isAuthenticated()) {
            console.log("Usuario authenticado");
            return next();
        }
        return res.redirect('/');
    }
};