const mongoose = require('mongoose')
const {Schema, model} = mongoose

const ProductoSchema = new Schema({
    nombre: {type: String, required: true},
    descripcion: {type: String, required: true},
    categoria: {type: String, required: true},
    codigo: {type: String, required: true},
    imgUrl: {type: String, required: true},
    precio: {type: Number, required: true},
    stock: {type: Number, required: true}
}, 
{
  timestamps: true,
  strictQuery: "throw"
}
);
  
  
  const ProductosModel = model('productos', ProductoSchema);



module.exports = {ProductosModel}