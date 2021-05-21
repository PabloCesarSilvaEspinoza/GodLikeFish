const express = require('express');
const passport = require('passport');
const passportLocal = require('passport-local').Strategy;
const render = require('./render');
const Controller = require('./index');
const router = express.Router();

router.get('/', render.getLogin);
router.get('/confirmarCorreo', render.getConfirmarCorreo);
router.get('/reestablecerContraseña', render.getReestablecerContraseña);

router.post('/login', passport.authenticate('local', {
    successRedirect: "/validarPermisos",
    failureRedirect: "/"
}));

router.get('/logOut', render.getLogOut);
router.get('/validarPermisos', render.getValidarPermisos);

passport.use(new passportLocal(function (username, password, done) {
    console.log(username, password);
    Controller.validarUsuario(username, password)
        .then(user => {
            console.log(user);
            return done(null, user);
        })
        .catch(error => {
            return done(null, false);
        })
}));

//serealización
passport.serializeUser(function (user, done) {
    done(null, user)
});

//deserialización
passport.deserializeUser(function (user, done) {
    done(null, user)
});

module.exports = router;

