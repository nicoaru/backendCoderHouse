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


module.exports = {
  logger
}