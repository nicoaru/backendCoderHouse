const {MongoDBClient} = require('../dataBase/mongoDBClient.js')

class ContenedorMongoDB {
    constructor(model) {
        this.model = model;
        this.mongoClient = this.connectDB()
    }

    // connect to DB
    connectDB() {
        MongoDBClient.getInstance()
    }

    // devuelve la lista de objetos almacenados
    getAll() {
        return this.model.find()
    }
    // Devuelve el objeto con el id indicado
    getById(id) {
        return this.model.findOne({_id: id})
    }
    // Devuelve los objetos que cumplen el filtro
    getByFilter(filterObj) {
        return this.model.find(filterObj)
    }
    // Devuelve un solo objeto que cumple el filtro (deberia ser un filtro unique key)
    getOneByFilter(filterObj) {
        return this.model.findOne(filterObj)
    }    

    //Guarda un nuevo producto en la DB
    save(object) {
        const _object = new this.model(object)
        return _object.save()  
    }
    //Guarda varios productos nuevos en la DB
    saveMany(array) {
        return this.model.insertMany(array)
    }

    // elimina el objeto con el id indicado
    deleteById(id) {
        return this.model.deleteOne({_id:id})
    }
    // Elimina los objetos que cumplen el filtro
    deleteByFilter(filterObj) {
        return this.model.deleteMany(filterObj)
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