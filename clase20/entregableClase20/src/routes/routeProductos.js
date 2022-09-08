import { dbType } from "../config.js";
import * as DAOs from "../daos/daos.js";
import { Router } from "express";
import { isAdmin } from "../utils/middlewares.js";
const routerProductos = Router()

// defino cual DAO importo, segun la base de datos configurada en config.js
let Productos
switch (dbType) {
    case "MongoDB":
        Productos = DAOs.ProductosMongoDB
        break;
    case "Firebase":
        Productos = DAOs.ProductosFirebase
        break;
    default:
        break;
}


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


    // getAllProductos(req, res) {
    //     this.getAll()
    //     .then(data => res.json(data))
    //     .catch(error => res.status(400).json(error))
    // }

    // saveProducto(req, res) {
    //     let producto = req.body
    //     this.save(producto)
    //     .then(data => res.json(data))
    //     .catch(error => res.status(400).json(error))
    // }

    // getProductoById(req, res) {
    //     let id = req.params.id
    //     id = Types.ObjectId(id)
    //     this.getById(id)
    //     .then(data => res.json(data))
    //     .catch(error => res.status(400).json(error))
    // }

    // updateProductoById(req, res) {
    //     let id = req.params.id
    //     id = Types.ObjectId(id)
    //     let newObject = req.body
    //     this.updateById(newObject, id)
    //     .then(data => res.json(data))
    //     .catch(error => res.status(400).json(error))
    // }

    // deleteProductoById(req, res) {
    //     let id = req.params.id
    //     id = Types.ObjectId(id)
    //     this.deleteById(id)
    //     .then(data => res.json(data))
    //     .catch(error => res.status(400).json(error))
    // }

    // deleteAllProductos(req, res) {
    //     this.deleteAll()
    //     .then(data => res.json(data))
    //     .catch(error => res.status(400).json(error))
    // }
