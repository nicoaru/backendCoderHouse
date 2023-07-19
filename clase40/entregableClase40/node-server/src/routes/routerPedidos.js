const { PedidosDAO} = require("../model/daos/daos.js")
const { Router } = require("express")
const {isLogged} = require('../utils/middlewares.js')
const {savePedido, getPedidos} = require('../service/cotrollers/controllerPedidos.js')

const routerPedidos = Router()


// crea un pedido nuevo
routerPedidos.post("/", isLogged, savePedido)

// devuelve todos los pedidos del usuario
routerPedidos.get("/", isLogged, getPedidos)






module.exports = {routerPedidos}
