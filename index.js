const express = require('express');
const mongoose = require('mongoose');
const eventoRoutes = require('./routes/eventoRoutes');
const logger = require('./logger');

const app = express();
const PORT = 3000;
const MONGO_URI = 'mongodb://localhost:27017/agendaDB';

app.use(express.json());

mongoose.connect(MONGO_URI)
  .then(() => console.log('Conectado ao MongoDB com sucesso!'))
  .catch(err => {
    console.error('Erro ao conectar ao MongoDB:', err);
    logger.error(`Erro de conexão com o MongoDB: ${err.message}`);
  });

app.use('/api', eventoRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});