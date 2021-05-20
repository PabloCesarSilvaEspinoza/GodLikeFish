const express = require('express');
const session = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const config = require('./config.js');
const errors = require('./network/errors');

const app = express();

const indexRouter = require('./routes/index');
const user = require('./components/user/network');
const auth = require('./components/auth/network');
const course = require('./components/course/network');
const student = require('./components/student/network');
const speaker = require('./components/speaker/network');

//const secretSession = config.session.secret;
//const cookieSession = config.cookie.secret;
const store = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
}

//const {verificar} = require('./components/auth/sessionChecker');

//¿En que estas trabajando?    1)Postman 2)handlebars
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static('public'));

//Cookies
/*app.use(cookieParser({
    secret: 'DQcbdR94myYkuVHCT2SGJLj6aZvNsopl'
    })
);*/

//express session
app.use(session({
    secret: 'DQcbdR94myYkuVHCT2SGJLj6aZvNsopl',
    resave: false,
    saveUninitialized: false,
    /*store: store,
    cookie: {
        expires: 600000
    }*/
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

//handlebars rutas
app.use('/', indexRouter);
app.use('/', auth)
app.use('/usuario', user);
app.use('/curso', course);
//app.use('/estudiante', student);

//para cargarse la cookie si continua viva despues de iniciar sesion
app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');        
    }
    next();
});

app.use('/ponente', speaker)
//aqui se agregan las rutas que se anteponen a otras

//ultimo middleware, no poner nada debajo de esta linea
app.use(errors);

app.listen(config.api.port, () => {
    console.log('Api escuchando en el puerto ', config.api.port);
});