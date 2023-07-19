const { DAOsFactory } = require("../daos/daosFactory");




class ProductosRepository {

 

    // devuelve la lista de objetos almacenados
    static getAll() {
        const productosDAO = DAOsFactory.getProductosDao()
        return productosDAO.getAll()
    }
    // Devuelve el objeto con el id indicado
    static getById(id) {
        const productosDAO = DAOsFactory.getProductosDao()
        return productosDAO.getById(id)
    }
    // Devuelve los objetos que cumplen el filtro
    static getByFilter(filterObj) {
        const productosDAO = DAOsFactory.getProductosDao()
        return productosDAO.getByFilter(filterObj)
    }
    // Devuelve un solo objeto que cumple el filtro (deberia ser un filtro unique key)
    static getOneByFilter(filterObj) {
        const productosDAO = DAOsFactory.getProductosDao()
        return productosDAO.getOneByFilter(filterObj)
    }    

    //Guarda un nuevo producto en la DB
    static save(object) {
        const productosDAO = DAOsFactory.getProductosDao()
        return productosDAO.save(object)  
    }
    //Guarda varios productos nuevos en la DB
    static saveMany(array) {
        const productosDAO = DAOsFactory.getProductosDao()
        return productosDAO.saveMany(array)
    }

    // elimina el objeto con el id indicado
    static deleteById(id) {
        const productosDAO = DAOsFactory.getProductosDao()
        return productosDAO.deleteById(id)
    }
    // Elimina los objetos que cumplen el filtro
    static deleteByFilter(filterObj) {
        const productosDAO = DAOsFactory.getProductosDao()
        return productosDAO.deleteByFilter(filterObj)
    }
    // elimina todos los objetos
    static deleteAll() {
        const productosDAO = DAOsFactory.getProductosDao()
        return productosDAO.deleteAll()
    }

    // actualiza el objeto con el id indicado
    static updateById(updatedObject, id) {
        const productosDAO = DAOsFactory.getProductosDao()
        return productosDAO.updateById(updatedObject, id)
    }

}


module.exports = {
    ProductosRepository
}