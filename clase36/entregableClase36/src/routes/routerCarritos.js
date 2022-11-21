const { CarritosDAO} = require("../daos/daos.js")
const { Router } = require("express")
const {isLogged} = require('../utils/middlewares.js')
const routerCarritos = Router()



// crea un carrito nuevo
routerCarritos.post("/", isLogged, async (req, res) => {
    const userId = req.user?._id
    console.log("user en carritos post ", req.user)
    const result = await CarritosDAO.save({userId: userId})
    res.json(result)
})

// devuelve todos los carritos
routerCarritos.get("/", isLogged, async (req, res) => {
    console.log("req.user ", req.user)
    const result = await CarritosDAO.getAll(req, res)
    res.json(result)
} )

// elimina un carrito
// routerCarritos.delete("/:userId", isLogged, async (req, res) => {
//     const userId = req.user._id
//     const _result = await CarritosDAO.deleteCarritoById(req, res)
// } )

// devuelve todos los productos agregados a un carrito(array)
routerCarritos.get("/productos", isLogged, async (req, res) => {
    try {
        const itemToAdd = req.body
        const userId = req.user._id
        const carrito = await CarritosDAO.getOneByFilter({userId: userId})
        if(carrito) {
            const result = carrito.productos
            res.status(200).json(result)    
        }
        else {
            const error = {error: true, message: "El carrito no existe"}
            res.status(400).json(error)
        }
    }
    catch(err) {
        const error = {error: true, message: error.message}
        res.status(500).json(error)
    }
} )

// agrega un producto al carrito indicado
routerCarritos.post("/productos", isLogged, async (req, res) => {
    try {
        const itemToAdd = req.body
        const userId = req.user._id
        const carrito = await CarritosDAO.getOneByFilter({userId: userId})
        if(carrito) {
            carrito.productos.push(itemToAdd)
            const result = await carrito.save()
            res.status(200).json(result)    
        }
        else {
            const newCarrito = await CarritosDAO.save({userId: userId})
            newCarrito.productos.push(itemToAdd)
            const result = await newCarrito.save()
            res.status(200).json(result)   
        }
    }
    catch(err) {
        const error = {error: true, message: err.message}
        res.status(500).json(error)
    }
} )

// elimina todos los productos del carrito indicado
routerCarritos.delete("/productos", isLogged, async (req, res) => {
    console.log("Entro en DELETE /api/carritos/productos")
    try {
        const userId = req.user._id
        const carrito = await CarritosDAO.getOneByFilter({userId: userId})

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
} )




// // elimina un producto del carrito indicado
// routerCarritos.delete("/:id/productos/:id_prod", isLogged, (req, res) => {CarritosDAO.deleteProductFromCarrito(req, res)} )





module.exports = {routerCarritos}
