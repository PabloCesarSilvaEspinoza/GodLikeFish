const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const indexRouter = require('./routes/index');
const config = require('./config.js');
const errors = require('./network/errors');

const usuario = require('./componentes/usuario/network');
const auth = require('./componentes/auth/network');
const curso = require('./componentes/curso/network');
const estudiante = require('./componentes/estudiante/network');
const ponente = require('./componentes/ponente/network');
const administrador = require('./componentes/administrador/network');


//app.use(bodyParser.json());
app.use(bodyParser.json());


/*/ rutas (antiguas), moviendo a hbs
app.use('/api/user', user);
app.use('/api/auth', auth);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
*/

app.use(express.static('public'));

//handlebars
app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs'
}));

app.set('view engine', 'hbs');

//handlebars rutas
app.use('/', indexRouter);
app.use('/usuario', usuario);
app.use('/curso', curso);
app.use('/estudiante', estudiante);
app.use('/admin', administrador)
app.use('/ponente', ponente);

//aqui se agregan las rutas que se anteponen a otras

//ultimo middleware, no poner nada debajo de esta linea
app.use(errors);

app.listen(config.api.port, () => {
    console.log('Api escuchando en el puerto ', config.api.port);
});