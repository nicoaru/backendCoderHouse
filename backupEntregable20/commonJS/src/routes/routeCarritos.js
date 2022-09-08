const { Router } = require("express")
const  { CarritosMongoDB} = require('../daos/daos.js')

const Carritos = CarritosMongoDB
const routerCarritos = Router()

// import { Router } from "express"
// import { CarritosMongoDB as Carritos } from "../daos/daos.js"



// crea un carrito nuevo
routerCarritos.post("/", Carritos.saveCarrito)

// elimina un carrito
routerCarritos.delete("/:id", Carritos.deleteCarritoById)

// devuelve todos los productos agregados a un carrito(array)
routerCarritos.get("/:id/productos", Carritos.getAllProductsInCart)

// agrega un producto al carrito indicado
routerCarritos.post("/:id/productos", Carritos.addProductToCarrito)

// elimina un producto del carrito indicado
routerCarritos.delete("/:id/productos/:id_prod", Carritos.deleteProductFromCarrito)



module.exports = {routerCarritos}

// export {routerCarritos}