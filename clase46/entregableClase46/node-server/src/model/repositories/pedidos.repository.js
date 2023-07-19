const { DAOsFactory } = require("../daos/daosFactory");




class PedidosRepository {

 

    // devuelve la lista de objetos almacenados
    static getAll() {
        const pedidosDAO = DAOsFactory.getPedidosDao()
        return pedidosDAO.getAll()
    }
    // Devuelve el objeto con el id indicado
    static getById(id) {
        const pedidosDAO = DAOsFactory.getPedidosDao()
        return pedidosDAO.getById(id)
    }
    // Devuelve los objetos que cumplen el filtro
    static getByFilter(filterObj) {
        const pedidosDAO = DAOsFactory.getPedidosDao()
        return pedidosDAO.getByFilter(filterObj)
    }
    // Devuelve un solo objeto que cumple el filtro (deberia ser un filtro unique key)
    static getOneByFilter(filterObj) {
        const pedidosDAO = DAOsFactory.getPedidosDao()
        return pedidosDAO.getOneByFilter(filterObj)
    }    

    //Guarda un nuevo producto en la DB
    static save(object) {
        const pedidosDAO = DAOsFactory.getPedidosDao()
        return pedidosDAO.save(object)  
    }
    //Guarda varios productos nuevos en la DB
    static saveMany(array) {
        const pedidosDAO = DAOsFactory.getPedidosDao()
        return pedidosDAO.saveMany(array)
    }

    // elimina el objeto con el id indicado
    static deleteById(id) {
        const pedidosDAO = DAOsFactory.getPedidosDao()
        return pedidosDAO.deleteById(id)
    }
    // Elimina los objetos que cumplen el filtro
    static deleteByFilter(filterObj) {
        const pedidosDAO = DAOsFactory.getPedidosDao()
        return pedidosDAO.deleteByFilter(filterObj)
    }
    // elimina todos los objetos
    static deleteAll() {
        const pedidosDAO = DAOsFactory.getPedidosDao()
        return pedidosDAO.deleteAll()
    }

    // actualiza el objeto con el id indicado
    static updateById(updatedObject, id) {
        const pedidosDAO = DAOsFactory.getPedidosDao()
        return pedidosDAO.updateById(updatedObject, id)
    }

}


module.exports = {
    PedidosRepository
}