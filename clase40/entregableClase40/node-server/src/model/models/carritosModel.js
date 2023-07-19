const mongoose = require('mongoose')
const {Schema, model} = mongoose


const CarritoSchema = new Schema({
    userId: {type: String, required: true, unique: true},
    productos: {type: Array, required: true, default: []},
}, {timestamps: true});
  
  
const CarritosModel = model('carritos', CarritoSchema);


module.exports = {CarritosModel, CarritoSchema}


// ver si se puede definir un schema para los productos dentro del array