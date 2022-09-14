const mongoose = require("mongoose")
const {uriStringMongo} = require('../config.js')

class ContenedorMongoDB {
    constructor(model) {
        this.model = model;
        this.uriString = uriStringMongo
    }

    // connect to DB
    connect() {
        mongoose.connect(this.uriString)
        .then(res => console.log(`Respuesta conexión DB => conectado a ${res.connections[0]._connectionString}`))
        .catch(error => console.log("Error de conexión a DB => ", error.message))
    }
    // devuelve la lista de objetos almacenados
    getAll() {
        return this.model.find()
    }
    //Guarda un nuevo producto en el archivo
    save(object) {
        const _object = new this.model(object)
        return _object.save()  
    }
    // Devuelve el objeto con el id indicado
    getById(id) {
        return this.model.findOne({_id: id})
    }
    // elimina el objeto con el id indicado
    deleteById(id) {
        return this.model.deleteOne({_id:id})
    }
    // elimina todos los objetos
    deleteAll() {
        return this.model.deleteMany()
    }
    // actualiza el objeto con el id indicado
    updateById(updatedObject, id) {
        return this.model.findOneAndUpdate({_id: id}, updatedObject, {returnDocument:'after'})
    }
}
module.exports = {ContenedorMongoDB}