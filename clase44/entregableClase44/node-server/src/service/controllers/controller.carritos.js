const { CarritosRepository } = require('../../model/repositories/carritos.repository.js')
const mongoose = require("mongoose")
const Types = mongoose.Types

// devuelve el carrito correspondiente al userId pasado por parámetro
const getCarrito = async ({userId}) => {
    try {
        const carrito = await CarritosRepository.getOneByFilter({userId: userId}) 
        
        return carrito
    }
    catch(err) {
        const error = {error: true, message: err.message}
        return error
    }
}


// devuelve todos los productos agregados al carrito correspondiente al userId pasado por parámetro
const getProductosCarrito = async ({userId}) => {
    try {
        const carrito = await CarritosRepository.getOneByFilter({userId: userId})

        if(carrito) {
            const productosCarrito = carrito.productos
            return productosCarrito    
        }
        else {
            const error = {error: true, message: "El carrito no existe"}
            return error
        }

    }
    catch(err) {
        const error = {error: true, message: err.message}
        return error
    }
}

// agrega un item al carrito correspondiente al userId pasado por parámetro
const saveItemCarrito = async ({userId, input}) => {
    try {
        const carrito = await CarritosRepository.getOneByFilter({userId: userId})
        console.log("carrito ", carrito)
        if(carrito) {
            console.log("carrito.productos ", carrito.productos)
            carrito.productos.push(input)
            const result = await carrito.save()
            return result    
        }
        else {
            const error = {error: true, message: "No se encontró el carrito"}
            return error 
        }
    }
    catch(err) {
        console.log(err)
        const error = {error: true, message: err.message}
        return error
    }
}

// elimina todos los items del carrito correspondiente al userId pasado por parámetro

const deleteItemsCarrito = async ({userId}) => {
    try {
        const carrito = await CarritosRepository.getOneByFilter({userId: userId})

        if(carrito) {
            carrito.productos.splice(0, carrito.productos.length)
            console.log("carrito post splice ", carrito)
            const result = await carrito.save()

            console.log("result ", result)
  
            return result
        }
        else {
            const error = {error: true, message: "No existe el carrito"}
            console.log("error ", error)
            return error   
        }
    }
    catch(err) {
        const error = {error: true, message: err.message}
        console.log("error ", error)
        return error
    }
}

module.exports = {
    getCarrito,
    getProductosCarrito,
    saveItemCarrito,
    deleteItemsCarrito,
}