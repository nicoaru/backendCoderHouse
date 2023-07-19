const {isLogged} = require('../utils/middlewares.js')
const {savePedido, getPedidos} = require('../service/cotrollers/controllerPedidos.js')
const Router = require('koa-router')
const routerPedidos = new Router({
    prefix: '/api/pedidos'
})


// crea un pedido nuevo
routerPedidos.post("/", isLogged, savePedido)

// devuelve todos los pedidos del usuario
routerPedidos.get("/", isLogged, getPedidos)






module.exports = {routerPedidos}
