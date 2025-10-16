const mongoose = require('mongoose');
// AVISO: O 'require('./Logger')' vai dar erro por enquanto,
// porque ainda não criamos o arquivo Logger.js. Isso é normal.
// Vamos criar no próximo passo.
const Logger = require('./Logger');

const MONGO_URI = 'mongodb://localhost:27017/agendaDB';

async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Conectado ao MongoDB com sucesso!');
  } catch (err) {
    console.error('Erro ao conectar ao MongoDB:', err.message);
    // Usaremos nossa futura classe de Log aqui
    Logger.logError(`Erro de conexão com o MongoDB: ${err.message}`);
    process.exit(1); // Encerra o programa com falha
  }
}

module.exports = connectDB;