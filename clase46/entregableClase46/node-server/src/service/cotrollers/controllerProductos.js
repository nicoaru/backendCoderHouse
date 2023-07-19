const { ProductosRepository } = require('../../model/repositories/productos.repository.js')
console.log('ProductosRepository, ', ProductosRepository)
const mongoose = require("mongoose")
const Types = mongoose.Types

// devuelve todos los productos, con opcion de filtro por query
const getProducts = async (ctx) => {

    try {
        let filterObj = ctx.request.query?.filter
            ? JSON.parse(ctx.request.query.filter)
            : null
        
        if(filterObj) {
            console.log("con filtro => ", filterObj)
            const products = await ProductosRepository.getByFilter(filterObj)
            ctx.response.status = 200            
            ctx.response.body = products
            console.log('ctx.resp.body => ', ctx.response.body)            
        }        
        else {
            console.log("sin filtro")
            const products = await ProductosRepository.getAll()
            // console.log('products => ', products)
            ctx.status = 200            
            ctx.body = products            
        }
    }
    catch(err) {
        console.log("error => ", err)
        const error = {error: true, message: err.message}
        ctx.status = 500
        ctx.body = error
    }
}

// devuelve el producto con el id indicado
const getProductById = async (ctx) => {

    let id = ctx.params.id
    
    try {
        id = Types.ObjectId(id)   
    }
    catch(err) {
        const error = {error: true, message: err.message}
        ctx.status = 400
        ctx.body = error
        return
    }
    try {
        const product = await ProductosRepository.getById(id)  
        ctx.body = product
        ctx.status = 200
    }
    catch(err) {
        const error = {error: true, message: err.message}
        ctx.status = 500
        ctx.body = error
    }
}

// guarda uno o varios nuevos objetos
const saveProducts = async (ctx) => {
    try {
        const data = ctx.request.body
        console.log("req => ", data)

        if(Array.isArray(data) && (data.length > 0)) {
            console.log("Entró en 'Crear varios productos'")
            const result = await ProductosRepository.saveMany(data)
            ctx.body = result
            ctx.status = 200
        }
        else if(Object.keys(data).length > 0) {
            console.log("Entró en 'Crear un producto")
            const result = await ProductosRepository.save(data)
            ctx.body = result
            ctx.status = 200
        }
        else {
            console.log("Entró en POST api/muebles sin contenido para crear nuevo mueble")
            const error = {error: true, message: 'No se recibio objeto para crear nuevo registro en DB'}
            ctx.body = error
            ctx.status = 400
        }
    }
    catch(err) {
        const error = {error: true, message: err.message}
        ctx.body = error
        ctx.status = 400    
    }
}

// actualiza el objeto con el id indicade
const updateProductById = async (ctx) => {
        let id = ctx.params.id
        let updatedObject = ctx.request.body       
    try{
        id = Types.ObjectId(id)  
    }
    catch(err) {
        const error = {error: true, message: err.message}
        ctx.body = error
        ctx.status = 400
        return
    }
    
    try{
        const result = await ProductosRepository.updateById(updatedObject, id)
        ctx.body = result
        ctx.status = 200
    }
    catch(err) {
        const error = {error: true, message: err.message}
        ctx.body = error
        ctx.status = 400
    }

}


const deleteProducts = async (ctx) => {
    try {
        let filterObj = ctx.request.query?.filter
            ? JSON.parse(ctx.request.query?.filter)
            : null
        
        if(filterObj) {
            const result = await ProductosRepository.deleteByFilter(filterObj)
            ctx.body = result
            ctx.status = 200
        }        
        else {
            const result = await ProductosRepository.deleteAll()
            ctx.body = result
            ctx.status = 200
        }
    }
    catch(err) {
        const error = {error: true, message: err.message}
        ctx.body = error
        ctx.status = 500
    }
}

const deleteProductById = async (ctx) => {
    let id = ctx.params.id   
    try{
        id = Types.ObjectId(id)  
    }
    catch(err) {
        const error = {error: true, message: err.message}
        ctx.body = error
        ctx.status = 400
        return
    }
    try {
        const result = await ProductosRepository.deleteById(id)
        ctx.body = result
        ctx.status = 200
    }        
    catch(err) {
        const error = {error: true, message: err.message}
        ctx.body = error
        ctx.status = 500
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