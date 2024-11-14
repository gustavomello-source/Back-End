var express = require('express');
var router = express.Router();

// Rota da a página de login
router.get('/login', (req, res) => {
    res.render('login'); // Crie um template 'login.mustache' para o formulário de login
});

const usuario = 'admin';
const senha = 'senha';

// Rota para processar o login
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === usuario && password === senha) { // exemplo de login
        req.session.user = { username };
        return res.redirect('/');
    }

    res.status(401).send('Login inválido');
});

// Rota do logout
router.post('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
});

module.exports = router;
