const {ProductosDAO} = require('../../model/daos/daos.js')
const { ProductosRepository } = require('../../model/repositories/productos.repository.js')
const mongoose = require("mongoose")
const Types = mongoose.Types

// devuelve todos los productos, con opcion de filtro por query
const getProducts = async (req, res) => {
    try {
        let filterObj = req.query?.filter
            ? JSON.parse(req.query.filter)
            : null
        
        if(filterObj) {
            const products = await ProductosDAO.getByFilter(filterObj)
            res.status(200).json(products)
        }        
        else {
            const products = await ProductosDAO.getAll()
            res.status(200).json(products)
        }
    }
    catch(err) {
        const error = {error: true, message: err.message}
        res.status(500).json(error)
    }
}

// devuelve el producto con el id indicado
const getProductById = async (req, res) => {

    let id = req.params.id
    
    try {
        id = Types.ObjectId(id)   
    }
    catch(err) {
        const error = {error: true, message: err.message}
        res.status(400).json(error)
        return
    }
    try {
        const product = await ProductosDAO.getById(id)
        res.status(200).json(product)
    }
    catch(err) {
        const error = {error: true, message: err.message}
        res.status(500).json(error)
    }
}

// guarda uno o varios nuevos objetos
const saveProducts = async (req, res) => {
    try {
        const data = req.body

        if(Array.isArray(data) && (data.length > 0)) {
            console.log("Entró en 'Crear varios muebles")
            const result = await ProductosDAO.saveMany(data)
            res.status(200).json(result)
        }
        else if(Object.keys(data).length > 0) {
            console.log("Entró en 'Crear un mueble")
            const result = await ProductosDAO.save(data)
            res.status(200).json(result)
        }
        else {
            console.log("Entró en POST api/muebles sin contenido para crear nuevo mueble")
            res.status(400).json({message: 'No se recibio objeto para crear nuevo registro en DB'})
        }
    }
    catch(err) {
        const error = {error: true, message: err.message}
        res.status(500).json(error)
    }
}

// actualiza el objeto con el id indicade
const updateProductById = async (req, res) => {
        let id = req.params.id
        let updatedObject = req.body       
    try{
        id = Types.ObjectId(id)  
    }
    catch(err) {
        const error = {error: true, message: err.message}
        res.status(400).json(error)
        return
    }
    
    try{
        const result = await ProductosDAO.updateById(updatedObject, id)
        res.status(200).json(result)
    }
    catch(err) {
        const error = {error: true, message: err.message}
        res.status(400).json(error)
    }

}


const deleteProducts = async (req, res) => {
    try {
        let filterObj = req.query?.filter
            ? JSON.parse(req.query.filter)
            : null
        
        if(filterObj) {
            const result = await ProductosDAO.deleteByFilter(filterObj)
            res.status(200).json(result)
        }        
        else {
            const result = await ProductosDAO.deleteAll()
            res.status(200).json(result)
        }
    }
    catch(err) {
        const error = {error: true, message: err.message}
        res.status(500).json(error)
    }
}

const deleteProductById = async (req, res) => {
    let id = req.params.id   
    try{
        id = Types.ObjectId(id)  
    }
    catch(err) {
        const error = {error: true, message: err.message}
        res.status(400).json(error)
        return
    }
    try {
        const result = await ProductosDAO.deleteById(id)
        res.status(200).json(result)
    }        
    catch(err) {
        const error = {error: true, message: err.message}
        res.status(500).json(error)
    }
}


module.exports = {
    getProducts,
    getProductById,
    saveProducts,
    updateProductById,
    deleteProducts,
    deleteProductById
}