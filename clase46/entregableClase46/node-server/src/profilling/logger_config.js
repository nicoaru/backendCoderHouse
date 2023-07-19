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
const logEndpoint = async (ctx, next) => {
  logger.info(`Accedió a ruta ${ctx.request.url} - método ${ctx.request.method} bla bla bla`)
  await next()
}

module.exports = {
  logger,
  logEndpoint
}