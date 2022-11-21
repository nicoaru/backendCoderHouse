const { PedidosDAO} = require("../model/daos/daos.js")
const { Router } = require("express")
const {isLogged} = require('../utils/middlewares.js')
const {sendMail} = require('../service/nodeMailer.js')
const {sendSMS, sendWhatsapp} = require('../service/twilio.js')
const routerPedidos = Router()


// crea un pedido nuevo
routerPedidos.post("/", isLogged, async (req, res) => {
    try {
        const productos = req.body.productos
        let _precioTotal = 0
        productos.forEach(elem => {
                _precioTotal = _precioTotal + Number(elem.producto.precio) * Number(elem.cantidad)
        }) 
        const pedido = {
            userId: req.user?._id,
            nombre: req.user?.name,
            email: req.user?.email,
            direccion: req.user?.address,
            productos: productos,
            precioTotal: _precioTotal
        } 

        const result = await PedidosDAO.save(pedido)
        console.log("result => ", result)
        
        res.status(200).json(result)   

        try{
            // email al admin notificando nuevo pedido
            const emailSubject = `Nuevo pedido de ${result.nombre} - ${result.email}`
            const emailHtmlBody = `<h3>Nombre: ${result.nombre}</h3>
                                    <h3>Email: ${result.email}</h3>
                                    <h3>Dirección: ${result.direccion}</h3>
                                    <h3>Productos: 
                                        ${result.productos.map(elem => {
                                            return `<h4>${elem.cantidad} - ${elem.producto.nombre}</h4>`
                                        })}
                                    </h3>
                                    <h3>Total: $${result.precioTotal}</h3>`
            const adminEmailResult = await sendMail(emailSubject, emailHtmlBody, process.env.ADMIN_EMAIL)
            console.log("Nuevo pedido admin notification result ", adminEmailResult)
        }
        catch(err) {
            console.log("error notificando al admin por mail ", err.message)
        }

        try {
            // whatsapp al admin notificando nuevo pedido
            const whatsappBody = `Nuevo pedido de ${result.nombre} - ${result.email}`
            const whatsappResp = await sendWhatsapp(whatsappBody, process.env.TWILIO_WHATSAPP_FROM, process.env.ADMIN_TELEPHONE)
            console.log("whatsappResp ", whatsappResp)
        }
        catch(err) {
            console.log("error notificando por whatsapp ", err)
        }


        try {
            // sms al cliente notificando pedido en curso
            const smsBody = 'Su pedido ha sido recibido y se encuentra en proceso'
            const smsResp = await sendSMS(smsBody, process.env.TWILIO_SMS_FROM, req.user?.telephone)
            console.log("smsResp ", smsResp )            
        }   
        catch(err) {
            console.log("error notificando por sms", err)
        }

        
    }
    
    
    catch(err) {
        console.log("post pedidos error => ", err)
        const error = {error: true, message: err.message}
        res.status(500).json(error)
    }
})

// devuelve todos los pedidos del usuario
routerPedidos.get("/", isLogged, async (req, res) => {
    try{
        const _userId = req.user?._id
        const result = await PedidosDAO.getByFilter({userId: _userId})
        res.status(200).json(result)
    }
    catch(err) {
        console.log("get pedidos error => ", err)
        const error = {error: true, message: err.message}
        res.status(500).json(error)
    }
} )

// // elimina un carrito
// routerPedidos.delete("/:userId", isLogged, async (req, res) => {
//     const userId = req.user._id
//     const _result = await PedidosDAO.deleteCarritoById(req, res)
// } )

// // devuelve todos los productos agregados a un carrito(array)
// routerPedidos.get("/productos", isLogged, async (req, res) => {
//     try {
//         const itemToAdd = req.body
//         const userId = req.user._id
//         const carrito = await PedidosDAO.getByFilter({userId: userId})
//         if(carrito) {
//             const result = carrito.productos
//             res.status(200).json(result)    
//         }
//         else {
//             const error = {error: true, message: "El carrito no existe"}
//             res.status(400).json(error)
//         }
//     }
//     catch(err) {
//         const error = {error: true, message: error.message}
//         res.status(500).json(error)
//     }
// } )

// // agrega un producto al carrito indicado
// routerPedidos.post("/productos", isLogged, async (req, res) => {
//     try {
//         const itemToAdd = req.body
//         const userId = req.user._id
//         const carrito = await PedidosDAO.getByFilter({userId: userId})
//         if(carrito) {
//             carrito.productos.push(itemToAdd)
//             const result = await carrito.save()
//             res.status(200).json(result)    
//         }
//         else {
//             const newCarrito = await PedidosDAO.save({userId: userId})
//             newCarrito.productos.push(itemToAdd)
//             const result = await newCarrito.save()
//             res.status(200).json(result)   
//         }
//     }
//     catch(err) {
//         const error = {error: true, message: err.message}
//         res.status(500).json(error)
//     }
// } )

// // elimina un producto del carrito indicado
// routerPedidos.delete("/:id/productos/:id_prod", isLogged, (req, res) => {PedidosDAO.deleteProductFromCarrito(req, res)} )





module.exports = {routerPedidos}
