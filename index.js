const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const indexRouter = require('./routes/index');
const config = require('./config.js');
const errors = require('./network/errors');

const user = require('./components/user/network');
const auth = require('./components/auth/network');
const estudiante = require('./components/estudiante/network');//-------
const speaker = require('./components/speaker/network');
const curso = require('./components/curso/network');//-------

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
app.use('/usuario', user);
app.use('/curso', curso); //----------
app.use('/estudiante', estudiante); //---------
//app.use('/estudiante', student);

app.use('/ponente', speaker)
//aqui se agregan las rutas que se anteponen a otras

//ultimo middleware, no poner nada debajo de esta linea
app.use(errors);

app.listen(config.api.port, () => {
    console.log('Api escuchando en el puerto ', config.api.port);
});