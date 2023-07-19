const {ADMIN_TELEPHONE, ADMIN_EMAIL} = require('../../config/config.js')
const { PedidosRepository } = require('../../model/repositories/pedidos.repository.js')
const {sendMail} = require('../nodeMailer.js')
const {sendSMS, sendWhatsapp} = require('../twilio.js')
const mongoose = require("mongoose")
const { CarritosRepository } = require('../../model/repositories/carritos.repository.js')
const { UsersRepository } = require('../../model/repositories/users.repository.js')
const Types = mongoose.Types

// devuelve todos los pedidos correspondientes al usuario conectado
const getPedidos = async ({userId}) => {
    try {
    const pedidos = await PedidosRepository.getByFilter({userId: userId})
    console.log("pedidos ", pedidos)
    return pedidos
    }
    catch(err){
        const error = {error: true, message: err.message}
        console.log("GET pedidos error => ", error)
        return error
    }
}

// guarda un pedido nuevo
const savePedido = async ({userId}) => {
    try {
        let precioTotal = 0
        let pedido
        
        const user = await UsersRepository.getById(userId)
        console.log("user ", user)
        const carrito = await CarritosRepository.getOneByFilter({userId: userId})
        console.log("carrito ", carrito)

        if(!carrito || !user) {
            const error = {error: true, message: `No existe usuario con id ${userId} o por alguna razón no tiene carrito`}
            console.log('error1 ', error)
            return error 
        }
        const items = carrito.productos
        items.forEach(elem => {
            precioTotal = precioTotal + Number(elem.producto.precio) * Number(elem.cantidad)
        }) 
        pedido = {
            userId: userId,
            nombre: user.name,
            email: user.email,
            direccion: user.address,
            items: items,
            precioTotal: precioTotal
        } 

        const result = await PedidosRepository.save(pedido)
        console.log("result => ", result)
        
        return result
    }
    catch(err) {
        console.log("POST pedidos error => ", err)
        const error = {error: true, message: err.message}
        console.log('error2 ', error)
        return error
    }
}


module.exports = {
    getPedidos,
    savePedido
}