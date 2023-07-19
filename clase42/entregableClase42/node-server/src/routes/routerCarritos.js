const {saveCarrito, getCarrito, getProductosCarrito, saveItemCarrito, deleteItemsCarrito, deleteItemCarritoById} = require('../service/cotrollers/controllerCarritos.js')
const { Router } = require("express")
const {isLogged} = require('../utils/middlewares.js')
const routerCarritos = Router()




// devuelve el carrito correspondiente al usuario loggeado
routerCarritos.get("/", isLogged, getCarrito)

// crea un carrito nuevo asociado a un usuario, si por alguna razon el usuario no tiene carrito
routerCarritos.post("/", isLogged, saveCarrito)

// devuelve todos los productos agregados al carrito correspondiente al usuario loggeado
routerCarritos.get("/productos", isLogged, getProductosCarrito)

// agrega un producto al carrito correspondiente al usuario loggeado
routerCarritos.post("/productos", isLogged, saveItemCarrito)

// elimina todos los productos del carrito correspondiente al usuario loggeado
routerCarritos.delete("/productos", isLogged, deleteItemsCarrito)

// elimina el producto con id indicado del carrito correspondiente al usuario loggeado
routerCarritos.delete("/productos/:productId", isLogged, deleteItemCarritoById)




module.exports = {routerCarritos}
