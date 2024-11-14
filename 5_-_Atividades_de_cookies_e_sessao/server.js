const express = require('express');
const mustacheExpress = require('mustache-express');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();

// Configuração do template engine Mustache
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views'); // pasta views na raiz do projeto

// Middlewares para cookies, sessões e parsing de formulário
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}));

let totalCounter = 0;

// Rota principal "/" para renderizar o template index.mustache
app.get('/', (req, res) => {
  res.render('index', { userName: req.session.userName, tasks: req.session.tasks || [] }); // ou vazio
});

// Rota "/salvauser" para salvar o nome do usuário na sessão
app.post('/salvauser', (req, res) => {
  req.session.userName = req.body.userName;
  req.session.tasks = req.session.tasks || [];
  res.redirect('/');
});

// Rota "/addtask" para adicionar tarefas na sessão
app.post('/addtask', (req, res) => {
  const task = req.body.task;
  req.session.tasks = req.session.tasks || [];
  req.session.tasks.push(task);
  res.redirect('/');
});

// Rota "/random" para salvar numero aleatorio no cookie
app.get('/random', (req, res) => {
  let randomNumber = req.cookies.randomNumber;
  if (!randomNumber) { // se não existir cookie, gera um número aleatório
    randomNumber = Math.floor(Math.random() * 100) + 1;
    res.cookie('randomNumber', randomNumber);
  }
  res.send(`Número aleatório: ${randomNumber}`); // exibe o número aleatório no /random
});

// Rota "/contador" para o usuário
app.get('/contador', (req, res) => {
  totalCounter++;
  req.session.userCounter = (req.session.userCounter || 0) + 1;

  res.send(`Contador total: ${totalCounter} <br> Contador do usuário: ${req.session.userCounter}`);
});

// Inicia o servidor na porta 3000
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
