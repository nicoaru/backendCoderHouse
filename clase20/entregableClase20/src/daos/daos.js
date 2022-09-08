import { ProductosDaoMongoDB } from "./productos/productosDaoMongoDB.js";
import { CarritosDaoMongoDB } from "./carritos/carritosDaoMongoDB.js";
import { Producto } from "../models/productosModel.js";
import { Carrito } from "../models/carritosModel.js";

const ProductosMongoDB = new ProductosDaoMongoDB(Producto)
const CarritosMongoDB = new CarritosDaoMongoDB(Carrito)



export { ProductosMongoDB, CarritosMongoDB }