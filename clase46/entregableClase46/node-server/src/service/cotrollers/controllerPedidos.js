const {ADMIN_TELEPHONE, ADMIN_EMAIL} = require('../../config/config.js')
const { PedidosRepository } = require('../../model/repositories/pedidos.repository.js')
const {sendMail} = require('../nodeMailer.js')
const {sendSMS, sendWhatsapp} = require('../twilio.js')
const mongoose = require("mongoose")
const Types = mongoose.Types

// devuelve todos los pedidos correspondientes al usuario conectado
const getPedidos = async (ctx) => {

    try {
    const userId = ctx.state.user._id
    const pedidos = await PedidosRepository.getByFilter({userId: userId})

    ctx.body = pedidos
    ctx.status = 200
    }
    catch(err){
        console.log("GET pedidos error => ", err)
        const error = {error: true, message: err.message}

        ctx.body = error
        ctx.status = 500
    }
}

// devuelve el producto con el id indicado
const getPedidoById = async (ctx) => {

}

// guarda un pedido nuevo
const savePedido = async (ctx) => {

    const items = ctx.request.body?.items
    let _precioTotal = 0
    let pedido
    try {
        items.forEach(elem => {
                _precioTotal = _precioTotal + Number(elem.producto.precio) * Number(elem.cantidad)
        }) 
        pedido = {
            userId: ctx.state.user?._id,
            nombre: ctx.state.user?.name,
            email: ctx.state.user?.email,
            direccion: ctx.state.user?.address,
            items: items,
            precioTotal: _precioTotal
        } 

        const result = await PedidosRepository.save(pedido)
        console.log("result => ", result)
        
        ctx.body = result
        ctx.status = 200  

        try{
            // email al admin notificando nuevo pedido
            const emailSubject = `Nuevo pedido de ${result.nombre} - ${result.email}`
            const emailHtmlBody = `<h3>Nombre: ${result.nombre}</h3>
                                    <h3>Email: ${result.email}</h3>
                                    <h3>Dirección: ${result.direccion}</h3>
                                    <h3>Productos: 
                                        ${result.items.map(elem => {
                                            return `<h4>${elem.cantidad} - ${elem.producto.nombre}</h4>`
                                        })}
                                    </h3>
                                    <h3>Total: $${result.precioTotal}</h3>`
            const adminEmailResult = await sendMail(emailSubject, emailHtmlBody, ADMIN_EMAIL)
            console.log("Nuevo pedido admin notification result ", adminEmailResult)
        }
        catch(err) {
            console.log("error notificando al admin por mail ", err.message)
        }

        try {
            // whatsapp al admin notificando nuevo pedido
            const whatsappBody = `Nuevo pedido de ${result.nombre} - ${result.email}`
            const whatsappResp = await sendWhatsapp(whatsappBody, ADMIN_TELEPHONE)
            console.log("whatsappResp ", whatsappResp)
        }
        catch(err) {
            console.log("error notificando por whatsapp ", err)
        }


        try {
            // sms al cliente notificando pedido en curso
            const smsBody = 'Su pedido ha sido recibido y se encuentra en proceso'
            const smsResp = await sendSMS(smsBody, req.user?.telephone)
            console.log("smsResp ", smsResp )            
        }   
        catch(err) {
            console.log("error notificando por sms", err)
        }

    }
    
    catch(err) {
        console.log("POST pedidos error => ", err)
        const error = {error: true, message: err.message}

        ctx.body = error
        ctx.status = 500
    }

}

// actualiza el objeto con el id indicado
const updatePedidoById = async (req, res) => {

}

const deletePedidos = async (req, res) => {

}

const deletePedidoById = async (req, res) => {

}


module.exports = {
    getPedidos,
    getPedidoById,
    savePedido,
    updatePedidoById,
    deletePedidos,
    deletePedidoById
}