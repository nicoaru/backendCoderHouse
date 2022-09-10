import { ProductosDaoMongoDB } from "./productos/productosDaoMongoDB.js";
import { CarritosDaoMongoDB } from "./carritos/carritosDaoMongoDB.js";
import { Producto } from "../models/productosModel.js";
import { Carrito } from "../models/carritosModel.js";
import { ProductosDaoFirebase } from "./productos/productosDaoFirebase.js";
import { CarritosFirebase } from "./carritos/carritosDaoFirebase.js";
import { dbType } from "../config.js";

let Productos
let Carritos
switch (dbType) {
    case "MongoDB":
        Productos = new ProductosDaoMongoDB(Producto)
        Carritos = new CarritosDaoMongoDB(Carrito)
        break;
    case "Firebase":
        Productos = new ProductosDaoFirebase("productos")
        Carritos = new CarritosFirebase("carritos")
        break;
    default:
        break;
}


export { Productos, Carritos }