import { ProductosMongoDB as Productos } from "../daos/daos.js";
import { Router } from "express";

import { isAdmin } from "../utils/middlewares.js";

// const req = "req"
// const res = "res"
// console.log("ProductosMongoDB.model => ", Productos.model)
Productos.getAllProductos()
// Productos.save({  "nombre": "Russian Prince",
// "descripcion": "transform magnetic relationships",
// "codigo": "49999-113",
// "imgUrl": "http://dummyimage.com/244x176.png/5fa2dd/ffffff",
// "precio": 185.71,
// "stock": 41})
// .then(res => Productos.getAll().then(res => console.log("Find => ", res)))
// .catch(error => console.log(error))


const routerProductos = Router()

// devuelve todos los productos
routerProductos.get("/", Productos.getAllProductos)

// devuelve el producto con el id indicado
routerProductos.get("/:id", Productos.getProductoById)

// carga nuevo producto
routerProductos.post("/", isAdmin, Productos.saveProducto)

// actualiza el producto con el id indicado
routerProductos.put("/:id", isAdmin, Productos.updateProductoById)

// elimina el producto con el id indicado
routerProductos.delete("/:id", isAdmin, Productos.deleteProductoById)


export {routerProductos}