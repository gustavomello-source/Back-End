const express = require('express');
const app = express();
const port = 3000;

// Middleware de leitura de JSON no corpo da requisição
app.use(express.urlencoded({ extended: true }));

// Rota 1 para apresentar um link para a Rota 2
app.get('/rota1', (req, res) => {
    res.send('<h1>Rota 1</h1><a href="/rota2">Ir para Rota 2</a>');
});

// Rota 2 para apresentar um link para a Rota 1
app.get('/rota2', (req, res) => {
    res.send('<h1>Rota 2</h1><a href="/rota1">Ir para Rota 1</a>');
});

// Rota 3 para inverter texto, para entrar: http://localhost:3000/inverter?texto=exemplo
app.get('/inverter', (req, res) => {
    const texto = req.query.texto;
    if (texto) {
        const textoInvertido = texto.split('').reverse().join('');
        res.send(`Texto original: ${texto}<br>Texto invertido: ${textoInvertido}`);
    } else {
        res.send('Por favor, forneça o parâmetro "texto". Exemplo: /inverter?texto=exemplo');
    }
});

// Rota 4 para validar usuário e senha, para testar/entrar nela:  curl -X POST -d "usuario=root&senha=rootroot" http://localhost:3000/validar
// usuario=root&senha=rootroot para validar
app.post('/validar', (req, res) => {
    const { usuario, senha } = req.body;

    if (!usuario || !senha) {
        return res.send('Usuário ou senha não fornecidos.');
    }

    if (senha === usuario + usuario) {
        res.send(`Acesso ok`);
    } else {
        res.send('Acesso negado.');
    }
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
