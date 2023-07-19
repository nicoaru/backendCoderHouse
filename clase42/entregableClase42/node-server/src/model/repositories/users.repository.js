const { DAOsFactory } = require("../daos/daosFactory");




class UsersRepository {

 

    // devuelve la lista de objetos almacenados
    static getAll() {
        const usersDAO = DAOsFactory.getUsersDao()
        return usersDAO.getAll()
    }
    // Devuelve el objeto con el id indicado
    static getById(id) {
        const usersDAO = DAOsFactory.getUsersDao()
        return usersDAO.getById(id)
    }
    // Devuelve los objetos que cumplen el filtro
    static getByFilter(filterObj) {
        const usersDAO = DAOsFactory.getUsersDao()
        return usersDAO.getByFilter(filterObj)
    }
    // Devuelve un solo objeto que cumple el filtro (deberia ser un filtro unique key)
    static getOneByFilter(filterObj) {
        const usersDAO = DAOsFactory.getUsersDao()
        return usersDAO.getOneByFilter(filterObj)
    }    

    //Guarda un nuevo producto en la DB
    static save(object) {
        const usersDAO = DAOsFactory.getUsersDao()
        return usersDAO.save(object)  
    }
    //Guarda varios productos nuevos en la DB
    static saveMany(array) {
        const usersDAO = DAOsFactory.getUsersDao()
        return usersDAO.saveMany(array)
    }

    // elimina el objeto con el id indicado
    static deleteById(id) {
        const usersDAO = DAOsFactory.getUsersDao()
        return usersDAO.deleteById(id)
    }
    // Elimina los objetos que cumplen el filtro
    static deleteByFilter(filterObj) {
        const usersDAO = DAOsFactory.getUsersDao()
        return usersDAO.deleteByFilter(filterObj)
    }
    // elimina todos los objetos
    static deleteAll() {
        const usersDAO = DAOsFactory.getUsersDao()
        return usersDAO.deleteAll()
    }

    // actualiza el objeto con el id indicado
    static updateById(updatedObject, id) {
        const usersDAO = DAOsFactory.getUsersDao()
        return usersDAO.updateById(updatedObject, id)
    }

}


module.exports = {
    UsersRepository
}