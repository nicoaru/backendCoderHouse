const { DAOsFactory } = require("../daos/daosFactory");




class MensajesRepository {

 

    // devuelve la lista de objetos almacenados
    static getAll() {
        const mensajesDAO = DAOsFactory.getMensajesDao()
        return mensajesDAO.getAll()
    }
    // Devuelve el objeto con el id indicado
    static getById(id) {
        const mensajesDAO = DAOsFactory.getMensajesDao()
        return mensajesDAO.getById(id)
    }
    // Devuelve los objetos que cumplen el filtro
    static getByFilter(filterObj) {
        const mensajesDAO = DAOsFactory.getMensajesDao()
        return mensajesDAO.getByFilter(filterObj)
    }
    // Devuelve un solo objeto que cumple el filtro (deberia ser un filtro unique key)
    static getOneByFilter(filterObj) {
        const mensajesDAO = DAOsFactory.getMensajesDao()
        return mensajesDAO.getOneByFilter(filterObj)
    }    

    //Guarda un nuevo producto en la DB
    static save(object) {
        const mensajesDAO = DAOsFactory.getMensajesDao()
        return mensajesDAO.save(object)  
    }
    //Guarda varios productos nuevos en la DB
    static saveMany(array) {
        const mensajesDAO = DAOsFactory.getMensajesDao()
        return mensajesDAO.saveMany(array)
    }

    // elimina el objeto con el id indicado
    static deleteById(id) {
        const mensajesDAO = DAOsFactory.getMensajesDao()
        return mensajesDAO.deleteById(id)
    }
    // Elimina los objetos que cumplen el filtro
    static deleteByFilter(filterObj) {
        const mensajesDAO = DAOsFactory.getMensajesDao()
        return mensajesDAO.deleteByFilter(filterObj)
    }
    // elimina todos los objetos
    static deleteAll() {
        const mensajesDAO = DAOsFactory.getMensajesDao()
        return mensajesDAO.deleteAll()
    }

    // actualiza el objeto con el id indicado
    static updateById(updatedObject, id) {
        const mensajesDAO = DAOsFactory.getMensajesDao()
        return mensajesDAO.updateById(updatedObject, id)
    }

}


module.exports = {
    MensajesRepository
}