const express = require('express');
const mongoose = require('mongoose');
const eventoRoutes = require('./routes/eventoRoutes');
const logger = require('./logger');

const app = express();
const PORT = 3000;
// IMPORTANTE: Substitua pela sua string de conexão do MongoDB
const MONGO_URI = 'mongodb://localhost:27017/agendaDB';

// Middleware para permitir que o Express entenda JSON
app.use(express.json());

// Conexão com o MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log('Conectado ao MongoDB com sucesso!'))
  .catch(err => {
    // Captura e loga erro de conexão inicial com o banco de dados
    console.error('Erro ao conectar ao MongoDB:', err);
    logger.error(`Erro de conexão com o MongoDB: ${err.message}`);
  });

// Usar as rotas de evento com o prefixo /api
app.use('/api', eventoRoutes);

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});