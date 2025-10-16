const fs = require('fs');
const path = require('path');

// Define o caminho para o arquivo de log dentro da pasta /logs
const logFilePath = path.join(__dirname, 'logs', 'exceptions.log');

class Logger {
  // Método estático para que possamos chamá-lo sem criar uma instância da classe
  static logError(errorMessage) {
    const timestamp = new Date().toISOString();
    const logMessage = `${timestamp} - ERROR: ${errorMessage}\n`;

    // Garante que a pasta 'logs' exista
    if (!fs.existsSync(path.join(__dirname, 'logs'))) {
        fs.mkdirSync(path.join(__dirname, 'logs'));
    }
    
    // Adiciona a mensagem de erro ao final do arquivo de log
    fs.appendFile(logFilePath, logMessage, (err) => {
      if (err) {
        console.error('Falha ao escrever no arquivo de log:', err);
      }
    });
  }
}

module.exports = Logger;