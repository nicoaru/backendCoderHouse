const mongoose = require("mongoose")
const {Schema, model} = mongoose

// import mongoose from 'mongoose';


const CarritoSchema = new Schema({
    productos: {type: Array, required: true},
}, {timestamps: true});
  
  
const Carrito = model('carritos', CarritoSchema);

module.exports = {Carrito, CarritoSchema}

// export {Carrito, CarritoSchema}