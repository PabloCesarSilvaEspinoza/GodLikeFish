const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const swaggerUi = require('swagger-ui-express');
const indexRouter = require('../routes/index');

const auth = require('./components/auth/network');
const config = require('../config.js');
const errors = require('../network/errors');
const user = require('./components/user/network');




//app.use(bodyParser.json());
app.use(bodyParser.json());
//documentación del código, no tocar
const swaggerDoc = require('./swagger.json');

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
app.use('/user', user);
//aqui se agregan las rutas que se anteponen a otras

//ultimo middleware, no poner nada debajo de esta linea
app.use(errors);

app.listen(config.api.port, () => {
    console.log('Api escuchando en el puerto ', config.api.port);
});