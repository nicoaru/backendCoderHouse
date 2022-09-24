const {ContenedorMongoDB} = require('../../contenedores/contenedorMongoDB.js');
const mongoose = require("mongoose");
const Types = mongoose.Types

class MensajesDaoMongoDB extends ContenedorMongoDB {
  constructor(model) {
    super(model);
    this.connect()
  }

  getAllMensajes() {
    return this.getAll()
  }

  saveMensaje(msg) {
    return this.save(msg)
  }


}

module.exports = {MensajesDaoMongoDB}