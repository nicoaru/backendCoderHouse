const winston = require("winston");

var logger = new (winston.createLogger)({
  transports: [
    new (winston.transports.Console)({
      level: 'info'
    }),
    new (winston.transports.File)({
      name: 'warn-file',
      filename: 'warn.log',
      level: 'warn'
    }),
    new (winston.transports.File)({
      name: 'error-file',
      filename: 'error.log',
      level: 'error'
    })
  ]
});

// LOGS
const logEndpoint = (req, res, next) => {
  logger.info(`Accedió a ruta ${req.url} - método ${req.method}`)
  next()
}

module.exports = {
  logger,
  logEndpoint
}