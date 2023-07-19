const { CarritosRepository } = require('../../model/repositories/carritos.repository.js')
const mongoose = require("mongoose")
const Types = mongoose.Types

// devuelve el carrito correspondiente al usuario loggeado
const getCarrito = async (req, res) => {
    try {
        const userId = req.user._id
        const carrito = await CarritosRepository.getOneByFilter({userId: userId}) 
    
        res.status(200).json(carrito)
    }
    catch(err) {
        const error = {error: true, message: err.message}
        res.status(500).json(error)
    }
}


// guarda un nuevo carrito asociado al usuario loggeado
const saveCarrito = async (req, res) => {
    try {
        const userId = req.user._id
        const result = await CarritosRepository.save({userId: userId, productos: []}) 
    
        res.status(200).json(result)
    }
    catch(err) {
        const error = {error: true, message: err.message}
        res.status(500).json(error)
    }
}


// devuelve todos los productos agregados al carrito correspondiente al usuario loggeado
const getProductosCarrito = async (req, res) => {
    try {
        const userId = req.user._id
        const carrito = await CarritosRepository.getOneByFilter({userId: userId})

        if(carrito) {
            const productosCarrito = carrito.productos
            res.status(200).json(productosCarrito)    
        }
        else {
            const error = {error: true, message: "El carrito no existe"}
            res.status(400).json(error)
        }

    }
    catch(err) {
        const error = {error: true, message: err.message}
        res.status(500).json(error)
    }
}

// agrega un item al carrito correspondiente al usuario loggeado
const saveItemCarrito = async (req, res) => {
    try {
        const itemToAdd = req.body
        const userId = req.user._id
        const carrito = await CarritosRepository.getOneByFilter({userId: userId})
        console.log("carrito ", carrito)
        if(carrito) {
            console.log("carrito.productos ", carrito.productos)
            carrito.productos.push(itemToAdd)
            const result = await carrito.save()
            res.status(200).json(result)    
        }
        else {
            const newCarrito = await CarritosRepository.save({userId: userId})
            newCarrito.productos.push(itemToAdd)
            const result = await newCarrito.save()
            res.status(200).json(result)   
        }
    }
    catch(err) {
        console.log(err)
        const error = {error: true, message: err.message}
        res.status(500).json(error)
    }
}

// elimina todos los items al carrito correspondiente al usuario loggeado

const deleteItemsCarrito = async (req, res) => {
    try {
        const itemToAdd = req.body
        const userId = req.user._id
        const carrito = await CarritosRepository.getOneByFilter({userId: userId})

        if(carrito) {
            carrito.productos.splice(0, carrito.productos.length)
            console.log("carrito post splice ", carrito)
            const result = await carrito.save()

            console.log("result ", result)
  
            res.status(200).json(result)
        }
        else {
            const error = {error: true, message: "No existe el carrito"}
            res.status(400).json(error)   
        }
    }
    catch(err) {
        const error = {error: true, message: err.message}
        res.status(500).json(error)
    }
}


module.exports = {
    getCarrito,
    saveCarrito,
    getProductosCarrito,
    saveItemCarrito,
    deleteItemsCarrito
}