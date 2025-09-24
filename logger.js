const winston = require('winston');
const path = require('path');

const logger = winston.createLogger({
  level: 'error', // Gravar apenas logs a partir do nível 'error'
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    // Salvar erros no arquivo `logs/exceptions.log`
    new winston.transports.File({
      filename: path.join(__dirname, 'logs', 'exceptions.log'),
      level: 'error',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      )
    }),
  ],
});

// Se não estivermos em produção, também mostrar os logs no console
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

module.exports = logger;