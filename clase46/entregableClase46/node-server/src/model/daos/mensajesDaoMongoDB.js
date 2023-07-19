const {ContenedorMongoDB} = require('../contenedores/contenedorMongoDB.js');
const { MensajesModel } = require('../models/mensajesModel.js');


class MensajesDaoMongoDB extends ContenedorMongoDB {
  
  constructor() {
    super(MensajesModel)
  }

}

module.exports = {MensajesDaoMongoDB}