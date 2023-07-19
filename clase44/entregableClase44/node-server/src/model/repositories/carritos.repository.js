const { DAOsFactory } = require("../daos/daosFactory");




class CarritosRepository {

 

    // devuelve la lista de objetos almacenados
    static getAll() {
        const carritosDAO = DAOsFactory.getCarritosDao()
        return carritosDAO.getAll()
    }
    // Devuelve el objeto con el id indicado
    static getById(id) {
        const carritosDAO = DAOsFactory.getCarritosDao()
        return carritosDAO.getById(id)
    }
    // Devuelve los objetos que cumplen el filtro
    static getByFilter(filterObj) {
        const carritosDAO = DAOsFactory.getCarritosDao()
        return carritosDAO.getByFilter(filterObj)
    }
    // Devuelve un solo objeto que cumple el filtro (deberia ser un filtro unique key)
    static getOneByFilter(filterObj) {
        const carritosDAO = DAOsFactory.getCarritosDao()
        return carritosDAO.getOneByFilter(filterObj)
    }    

    //Guarda un nuevo producto en la DB
    static save(object) {
        const carritosDAO = DAOsFactory.getCarritosDao()
        return carritosDAO.save(object)  
    }
    //Guarda varios productos nuevos en la DB
    static saveMany(array) {
        const carritosDAO = DAOsFactory.getCarritosDao()
        return carritosDAO.saveMany(array)
    }

    // elimina el objeto con el id indicado
    static deleteById(id) {
        const carritosDAO = DAOsFactory.getCarritosDao()
        return carritosDAO.deleteById(id)
    }
    // Elimina los objetos que cumplen el filtro
    static deleteByFilter(filterObj) {
        const carritosDAO = DAOsFactory.getCarritosDao()
        return carritosDAO.deleteByFilter(filterObj)
    }
    // elimina todos los objetos
    static deleteAll() {
        const carritosDAO = DAOsFactory.getCarritosDao()
        return carritosDAO.deleteAll()
    }

    // actualiza el objeto con el id indicado
    static updateById(updatedObject, id) {
        const carritosDAO = DAOsFactory.getCarritosDao()
        return carritosDAO.updateById(updatedObject, id)
    }

}


module.exports = {
    CarritosRepository
}