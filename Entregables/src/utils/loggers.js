const winston = require('winston');
require('dotenv').config();
// Definir niveles
const levels = {
  debug: 0,
  http: 1,
  info: 2,
  warning: 3,
  error: 4,
  fatal: 5
};

// Configuración del logger para desarrollo
const devLogger = winston.createLogger({
  levels,
  transports: [
    new winston.transports.Console({
      level: 'debug'
    })
  ]
});

// Configuración del logger para producción
const prodLogger = winston.createLogger({
  levels,
  transports: [
    new winston.transports.Console({
      level: 'info'
    }),
    new winston.transports.File({
      filename: 'errors.log',
      level: 'error'
    })
  ]
});

module.exports = process.env.NODE_ENV === 'production' ? prodLogger : devLogger;