const mongoose = require('mongoose')
const {Schema, model} = mongoose


const PedidoSchema = new Schema({
    userId: {type: String, required: true},
    nombre: {type: String},
    email: {type: String},
    productos: {type: Array, required: true, default: []},
    precioTotal: {type: Number},
    direccion: {type: String}
}, {timestamps: true});



  
  
const PedidosModel = model('pedidos', PedidoSchema);


module.exports = {PedidosModel, PedidoSchema}