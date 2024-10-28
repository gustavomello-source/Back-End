var express = require('express');
var mustacheExpress = require('mustache-express');
var path = require('path');
var indexRouter = require('./routes/index');

var app = express();

// Mustache
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rotas
app.use('/', indexRouter);

// Inicializa o servidor
const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});