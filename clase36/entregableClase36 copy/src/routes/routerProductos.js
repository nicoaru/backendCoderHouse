const { ProductosDAO} = require("../daos/daos.js")
const { Router } = require("express")
const {isLogged} = require('../utils/middlewares.js')
const routerProductos = Router()


// devuelve todos los productos
routerProductos.get("/", isLogged, (req, res) => {
    ProductosDAO.getAllProductos(req, res)
})

// devuelve el producto con el id indicado
routerProductos.get("/:id", isLogged, (req, res) => {
    console.log("get producto req.user ", req.user)
    ProductosDAO.getProductoById(req, res)
})

// carga nuevo producto
routerProductos.post("/", isLogged, (req, res) => {
    ProductosDAO.saveProducto(req, res)
})

// actualiza el producto con el id indicado
routerProductos.put("/:id", isLogged, (req, res) => {
    ProductosDAO.updateProductoById(req, res)
})

// elimina el producto con el id indicado
routerProductos.delete("/:id", isLogged, (req, res) => {
    ProductosDAO.deleteProductoById(req, res)
})



module.exports = {routerProductos}
