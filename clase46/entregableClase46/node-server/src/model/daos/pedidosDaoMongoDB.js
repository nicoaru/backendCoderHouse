const {ContenedorMongoDB} = require('../contenedores/contenedorMongoDB.js')
const {PedidosModel} = require('../models/pedidosModel.js')


class PedidosDaoMongoDB extends ContenedorMongoDB {
    
    constructor() {
      super(PedidosModel)
    }
    
}

module.exports = {PedidosDaoMongoDB}