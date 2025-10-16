const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, 'logs', 'exceptions.log');

class Logger {

  static logError(errorMessage) {
    const timestamp = new Date().toISOString();
    const logMessage = `${timestamp} - ERROR: ${errorMessage}\n`;

    if (!fs.existsSync(path.join(__dirname, 'logs'))) {
        fs.mkdirSync(path.join(__dirname, 'logs'));
    }
    
    fs.appendFile(logFilePath, logMessage, (err) => {
      if (err) {
        console.error('Falha ao escrever no arquivo de log:', err);
      }
    });
  }
}

module.exports = Logger;