import { Productos } from "../daos/daos.js";
import { Router } from "express";
import { isAdmin } from "../utils/middlewares.js";
const routerProductos = Router()


// devuelve todos los productos
routerProductos.get("/", (req, res) => {
    Productos.getAllProductos(req, res)
})

// devuelve el producto con el id indicado
routerProductos.get("/:id", (req, res) => {
    Productos.getProductoById(req, res)
})

// carga nuevo producto
routerProductos.post("/", isAdmin, (req, res) => {
    Productos.saveProducto(req, res)
})

// actualiza el producto con el id indicado
routerProductos.put("/:id", isAdmin, (req, res) => {
    Productos.updateProductoById(req, res)
})

// elimina el producto con el id indicado
routerProductos.delete("/:id", isAdmin, (req, res) => {
    Productos.deleteProductoById(req, res)
})



export {routerProductos}