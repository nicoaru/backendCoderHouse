const {ContenedorMongoDB} = require('../contenedores/contenedorMongoDB.js');
const mongoose = require("mongoose");
const Types = mongoose.Types

class MensajesDaoMongoDB extends ContenedorMongoDB {
  
  constructor(model) {
    super(model)
  }

}

module.exports = {MensajesDaoMongoDB}