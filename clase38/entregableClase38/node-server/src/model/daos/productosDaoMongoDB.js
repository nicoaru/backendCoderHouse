const {ContenedorMongoDB} = require('../contenedores/contenedorMongoDB.js')
const mongoose = require("mongoose")
const Types = mongoose.Types



class ProductosDaoMongoDB extends ContenedorMongoDB {
    
    constructor(model) {
      super(model)
    }

}

module.exports = { ProductosDaoMongoDB}