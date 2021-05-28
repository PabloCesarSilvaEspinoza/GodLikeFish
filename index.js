const express = require('express');
const session = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const config = require('./config.js');
const errors = require('./network/errors');

const app = express();

const auth = require('./componentes/auth/network');
const estudiante = require('./componentes/estudiante/network');
const ponente = require('./componentes/ponente/network');
const administrador = require('./componentes/administrador/network');

let { verificar } = require('./componentes/auth/checker');
let { verificarPonente } = require('./componentes/auth/checker');
let { verificarEstudiante } = require('./componentes/auth/checker');
let { verificarAdministrador } = require('./componentes/auth/checker');

//¿En que estas trabajando?    1)Postman 2)handlebars
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(express.static('public'));

//express session
app.use(session({
    secret: 'DQcbdR94myYkuVHCT2SGJLj6aZvNsopl',
    resave: false,
    saveUninitialized: false
}));

//app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//handlebars
app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs'
}));
app.set('view engine', 'hbs');

//para cargarse la cookie si continua viva despues de iniciar sesion
app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');
    }
    next();
});

//Rutas
app.use('/', auth) //esta siempre va por defecto
app.use('/estudiante', verificar, verificarEstudiante, estudiante);
app.use('/administrador', verificar, verificarAdministrador, administrador)
app.use('/ponente', verificar, verificarPonente, ponente);

//ultimo middleware, no poner nada debajo de esta linea
app.use(errors);

app.listen(config.api.port, () => {
    console.log('Api escuchando en el puerto ', config.api.port);
});