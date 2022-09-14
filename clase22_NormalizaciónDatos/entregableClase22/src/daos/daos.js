const { MensajesDaoMongoDB } = require('./mensajes/mensajesDaoMongoDB.js')
const { MensajesModel } = require('../models/mensajesModel.js');

const MensajesDAO = new MensajesDaoMongoDB(MensajesModel)

module.exports = { MensajesDAO }