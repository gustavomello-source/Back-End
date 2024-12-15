const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const SECRET_KEY = 'sua_chave_super_secreta_aqui';

// Middleware para processar JSON
app.use(bodyParser.json());

// Array de mensagens aleatórias para demonstração
const randomMessages = [
    "Mensagem Teste 1",
    "Mensagem Teste 2",
    "Mensagem Teste 3",
    "Mensagem Teste 4"
];

// Rota 1
app.post('/generate-token', (req, res) => {
    try {
        const randomMessage = randomMessages[Math.floor(Math.random() * randomMessages.length)];
        
        const payload = {
            message: randomMessage,
            timestamp: new Date().getTime()
        };

        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });

        res.json({
            success: true,
            token: token,
            message: "Token gerado com sucesso!"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: "Erro ao gerar token",
            details: error.message
        });
    }
});

// Rota 2
app.post('/decode-token', (req, res) => {
    try {
        const { token } = req.body;

        if (!token) {
            return res.status(400).json({
                success: false,
                error: "Token não fornecido"
            });
        }

        const decoded = jwt.verify(token, SECRET_KEY);

        res.json({
            success: true,
            decodedMessage: decoded.message,
            timestamp: new Date(decoded.timestamp),
            message: "Token decodificado com sucesso!"
        });
    } catch (error) {
        let errorMessage = "Erro ao decodificar token";
        
        if (error.name === 'TokenExpiredError') {
            errorMessage = "Token expirado";
        } else if (error.name === 'JsonWebTokenError') {
            errorMessage = "Token inválido";
        }

        res.status(401).json({
            success: false,
            error: errorMessage,
            details: error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});