const { ProductosRepository } = require('../../model/repositories/productos.repository.js')
console.log('ProductosRepository, ', ProductosRepository)
const mongoose = require("mongoose")
const Types = mongoose.Types

// devuelve todos los productos, con opcion de filtro por query
const getProducts = async () => {
    try {
        const products = await ProductosRepository.getAll()
        return products
    }
    catch(err) {
        const error = {error: true, message: err.message}
        return error
    }
}

// devuelve el producto con el id indicado
const getProductById = async ({id}) => {
    
    try {
        id = Types.ObjectId(id)   
    }
    catch(err) {
        const error = {error: true, message: err.message}
        return error
    }
    try {
        const product = await ProductosRepository.getById(id)
        return product
    }
    catch(err) {
        const error = {error: true, message: err.message}
        return error
    }
}

// guarda uno o varios nuevos objetos
const saveProducts = async ({input}) => {
    try {
        const data = input

        if(Array.isArray(data) && (data.length > 0)) {
            console.log("Entró en 'Crear varios muebles")
            const result = await ProductosRepository.saveMany(data)
            return result
        }
        else if(Object.keys(data).length > 0) {
            console.log("Entró en 'Crear un mueble")
            const result = await ProductosRepository.save(data)
            return result
        }
        else {
            console.log("Entró en POST api/muebles sin contenido para crear nuevo mueble")
            return {message: 'No se recibio objeto para crear nuevo registro en DB'}
        }
    }
    catch(err) {
        const error = {error: true, message: err.message}
        return error
    }
}

// actualiza el objeto con el id indicade
const updateProductById = async ({id, input}) => {
    console.log("Entro en updateProductById")
    let updatedObject = input    
    try{
        id = Types.ObjectId(id)  
    }
    catch(err) {
        const error = {error: true, message: err.message}
        return error
    }
    
    try{
        const result = await ProductosRepository.updateById(updatedObject, id)
        return result
    }
    catch(err) {
        const error = {error: true, message: err.message}
        return error
    }

}

const deleteProductById = async ({id}) => {
    console.log("Entro en deleteProductById")
    try{
        id = Types.ObjectId(id)  
    }
    catch(err) {
        const error = {error: true, message: err.message}
        console.log("error1 deleteProductById", error)
        return error
    }
    try {
        const result = await ProductosRepository.deleteById(id)
        console.log("result deleteProductById", result)
        return result
    }        
    catch(err) {
        const error = {error: true, message: err.message}
        console.log("error2 deleteProductById", error)
        return error
    }
}


module.exports = {
    getProducts,
    getProductById,
    saveProducts,
    updateProductById,
    deleteProductById
}