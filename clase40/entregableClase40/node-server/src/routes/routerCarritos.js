const {saveCarrito, getCarrito, getProductosCarrito, saveItemCarrito, deleteItemsCarrito} = require('../service/cotrollers/controllerCarritos.js')
const { Router } = require("express")
const {isLogged} = require('../utils/middlewares.js')
const routerCarritos = Router()




// devuelve el carrito correspondiente al usuario loggeado
routerCarritos.get("/", isLogged, getCarrito)

// crea un carrito nuevo asociado a un usuario, si por alguna razon el usuario no tiene carrito
routerCarritos.post("/", isLogged, saveCarrito)

// devuelve todos los productos agregados a un carrito
routerCarritos.get("/productos", isLogged, getProductosCarrito)

// agrega un producto al carrito indicado
routerCarritos.post("/productos", isLogged, saveItemCarrito)

// elimina todos los productos del carrito indicado
routerCarritos.delete("/productos", isLogged, deleteItemsCarrito)






module.exports = {routerCarritos}
