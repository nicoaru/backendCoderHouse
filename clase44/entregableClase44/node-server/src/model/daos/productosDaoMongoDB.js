const {ContenedorMongoDB} = require('../contenedores/contenedorMongoDB.js')
const {ProductosModel} = require('../models/productosModel.js')


class ProductosDaoMongoDB extends ContenedorMongoDB {
    
    constructor() {
      super(ProductosModel)
    }

}

module.exports = { ProductosDaoMongoDB}