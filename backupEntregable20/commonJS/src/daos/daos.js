const { ProductosDaoMongoDB } = require("./productos/productosDaoMongoDB.js")
const { CarritosDaoMongoDB } = require("./carritos/carritosDaoMongoDB.js")
const {Producto} = require("../models/productosModel.js")
const {Carrito} = require("../models/carritosModel.js")

// import { ProductosDaoMongoDB } from "./productos/productosDaoMongoDB.js";
// import { CarritosDaoMongoDB } from "./carritos/carritosDaoMongoDB.js";
// import { Producto } from "../models/productosModel.js";
// import { Carrito } from "../models/carritosModel.js";

const ProductosMongoDB = new ProductosDaoMongoDB(Producto)
const CarritosMongoDB = new CarritosDaoMongoDB(Carrito)


module.exports = { ProductosMongoDB, CarritosMongoDB }

// export { ProductosMongoDB, CarritosMongoDB }