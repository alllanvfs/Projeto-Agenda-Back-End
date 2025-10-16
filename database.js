const mongoose = require('mongoose');

const Logger = require('./Logger');

const MONGO_URI = 'mongodb://localhost:27017/agendaDB';

async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Conectado ao MongoDB com sucesso!');
  } catch (err) {
    console.error('Erro ao conectar ao MongoDB:', err.message);

    Logger.logError(`Erro de conexão com o MongoDB: ${err.message}`);
    process.exit(1);
  }
}

module.exports = connectDB;