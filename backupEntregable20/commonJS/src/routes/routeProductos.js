const {ProductosMongoDB} = require("../daos/daos.js")
const { Router} = require("express")
const {isAdmin} = require("../utils/middlewares.js")

const Productos = ProductosMongoDB;


// import { ProductosMongoDB as Productos } from "../daos/daos.js";
// import { Router } from "express";
// import { isAdmin } from "../utils/middlewares.js";

Productos.getAllProductos()


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

module.exports = {routerProductos}

// export {routerProductos}