const express = require('express');
const session = require('express-session');
const app = express();
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const indexRouter = require('./routes/index');
const config = require('./config.js');
const errors = require('./network/errors');

const user = require('./components/user/network');
const auth = require('./components/auth/network');
const course = require('./components/course/network');
const student = require('./components/student/network');
const speaker = require('./components/speaker/network');

//¿En que estas trabajando?    1)Postman 2)handlebars
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static('public'));

//sesiones con cookies
app.use(session({
    resave: false, //no guardar la cookie cada que sucede un cambio
    saveUninitialized: false, //si la cookie no se ha inicializado no guardar por defecto
    secret: "liA2c65rYsnWp0SVgk3duZPKtILwqDUO"
    })
);

/* app.get('/cookie', function(req,res){
    req.session.count = req.session.count ? req.session.count +1 : 1;
    res.status(200).json({hello: "world", counter: req.session.count});
}); */

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

app.use('/ponente', speaker)
//aqui se agregan las rutas que se anteponen a otras

//ultimo middleware, no poner nada debajo de esta linea
app.use(errors);

app.listen(config.api.port, () => {
    console.log('Api escuchando en el puerto ', config.api.port);
});