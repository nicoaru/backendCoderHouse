class ContenedorMongoDB {
    constructor(model) {
        this.model = model
    }

    // devuelve la lista de objetos almacenados
    getAll() {
        return this.model.find()
    }

    //Guarda un nuevo producto en el archivo
    save(object) {
        const model = this.model
        const _object = new model(object)
        return _object.save()  
    }

    // Devuelve el objeto con el id indicado
    getById(id) {
        const model = this.model
        return model.findOne({_id: id})
    }
    
    // elimina el objeto con el id indicado
    deleteById(id) {
        const model = this.model
        return model.deleteOne({_id:id})
    }

    // elimina todos los objetos
    deleteAll() {
        const model = this.model;
        return model.deleteMany()
    }

    // actualiza el objeto con el id indicado
    updateById(updatedObject, id) {
        const model = this.model;
        return new Promise((resolve, reject) => {
            
            model.findOne({_id: id})
            .then(res => {
                _object = {...res, ...updatedObject} 
                return _object.save()
            })
            .then(res => resolve(res))
            .catch(error => reject(error))                      
        })
    }
}

module.exports = {ContenedorMongoDB}
// export {ContenedorMongoDB}