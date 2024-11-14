var express = require('express');
var mustacheExpress = require('mustache-express');
var path = require('path');
var session = require('express-session');
var indexRouter = require('./routes/index');

var authRouter = require('./routes/auth');


var app = express();

// Mustache
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Configuração da sessão
app.use(session({
    secret: 'segredo',
    resave: false,
    saveUninitialized: false
}));

app.use('/', authRouter);

// Rotas
app.use('/', indexRouter);

// Inicializa o servidor
const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
