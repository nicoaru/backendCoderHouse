const { CarritosRepository } = require('../../model/repositories/carritos.repository.js')
const mongoose = require("mongoose")
const Types = mongoose.Types

// devuelve el carrito correspondiente al usuario loggeado
const getCarrito = async (ctx) => {
    try {
        const userId = ctx.state.user._id
        const carrito = await CarritosRepository.getOneByFilter({userId: userId}) 
        
        ctx.body = carrito
        ctx.status = 200
    }
    catch(err) {
        const error = {error: true, message: err.message}

        ctx.body = error
        ctx.status = 500
    }
}



// devuelve todos los productos agregados al carrito correspondiente al usuario loggeado
const getProductosCarrito = async (ctx) => {
    try {
        const userId = ctx.state.user._id
        const carrito = await CarritosRepository.getOneByFilter({userId: userId})

        if(carrito) {
            const productosCarrito = carrito.productos
            
            ctx.body = productosCarrito
            ctx.status = 200   
        }
        else {
            const error = {error: true, message: "El carrito no existe"}

            ctx.body = error
            ctx.status = 400
        }

    }
    catch(err) {
        const error = {error: true, message: err.message}

        ctx.body = error
        ctx.status = 500
    }
}

// agrega un item al carrito correspondiente al usuario loggeado
const saveItemCarrito = async (ctx) => {
    try {
        const itemToAdd = ctx.request.body
        const userId = ctx.state.user._id
        const carrito = await CarritosRepository.getOneByFilter({userId: userId})
        console.log("carrito ", carrito)
        if(carrito) {
            console.log("carrito.productos ", carrito.productos)
            carrito.productos.push(itemToAdd)
            const result = await carrito.save()

            ctx.body = result
            ctx.status = 200  
        }
        else if (carrito === null) {
            const newCarrito = await CarritosRepository.save({userId: userId})
            newCarrito.productos.push(itemToAdd)
            const result = await newCarrito.save()

            ctx.body = result
            ctx.status = 200
        }
    }
    catch(err) {
        console.log(err)
        const error = {error: true, message: err.message}

        ctx.body = error
        ctx.status = 500  
    }
}

// elimina todos los items al carrito correspondiente al usuario loggeado

const deleteItemsCarrito = async (ctx) => {
    try {
        const userId = ctx.state.user._id
        const carrito = await CarritosRepository.getOneByFilter({userId: userId})

        if(carrito) {
            carrito.productos.splice(0, carrito.productos.length)
            console.log("carrito post splice ", carrito)
            const result = await carrito.save()

            console.log("result ", result)
  
            ctx.body = result
            ctx.status = 200
        }
        else {
            const error = {error: true, message: "No existe el carrito"}

            ctx.body = error
            ctx.status = 400 
        }
    }
    catch(err) {
        const error = {error: true, message: err.message}

        ctx.body = error
        ctx.status = 500 
    }
}

// elimina el producto con id indicado del carrito correspondiente al usuario loggeado

const deleteItemCarritoById = async (ctx) => {
    try {
        let productId = ctx.params.productId
        console.log('ctx.params.productId => ', ctx.params.productId) 
        const userId = ctx.state.user._id
        const carrito = await CarritosRepository.getOneByFilter({userId: userId})

        if(carrito) {
            const itemIndex = carrito.productos.findIndex(item => item.producto._id === productId)
            console.log('itemIndex => ', itemIndex)
            if(itemIndex === -1) {
                const error = {error: true, message: `No existe producto con id ${productId} en el carrito ${carrito._id}`}
                
                ctx.body = error
                ctx.status = 400
                return
            }
            carrito.productos.splice(itemIndex, 1)
            console.log("carrito post splice ", carrito)
            const result = await carrito.save()

            console.log("result ", result)
  
            ctx.body = result
            ctx.status = 200
        }
        else {
            const error = {error: true, message: "No existe el carrito"}

            ctx.body = error
            ctx.status = 400   
        }
    }
    catch(err) {
        const error = {error: true, message: err.message}

        ctx.body = error
        ctx.status = 500
    }
}

module.exports = {
    getCarrito,
    getProductosCarrito,
    saveItemCarrito,
    deleteItemsCarrito,
    deleteItemCarritoById
}