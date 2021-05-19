module.exports = {
    verificar (req, res, next) {
        console.log(req.body);
        if (req.isAuthenticated()) {
            console.log("authenticado");
            return next();
        }
        return res.redirect('/');
    }
};