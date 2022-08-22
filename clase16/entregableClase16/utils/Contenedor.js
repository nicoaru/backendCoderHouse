const fs = require("fs")

const knex = require('knex')


class Contenedor {
    constructor(config, tableName) {
        this.config = config,
        this.tableName = tableName
        this.database = this.connectDatabase(this.config)
    }

    //Conecta con la base de datos
    connectDatabase(config) {
        return knex(config)
    }

    //Guarda un nuevo producto en el archivo
    save(objeto) {
        const tableName = this.tableName
        const database = this.database
        return database(tableName).insert(objeto)
    }

    // devuelve el objeto con el id indicado
    getById(id) {
        const tableName = this.tableName
        const database = this.database
        return database.select().from(tableName).where({id: id})
    }
    // devuelve la lista de objetos almacenados
    getAll() {
        const tableName = this.tableName
        const database = this.database
        return database.select().from(tableName)
    }
    // elimina el objeto con el id indicado
    async deleteById(id) {
        const tableName = this.tableName
        const database = this.database
        return database(tableName).where({id:id}).del()
    }
    // elimina todos los objetos
    async deleteAll() {
        const tableName = this.tableName
        const database = this.database
        return database(tableName).where(true).del()
    }
    // actualiza el objeto con el id indicado
    updateById(updatedProduct, id) {
        const tableName = this.tableName
        const database = this.database
        return database(tableName).where(true).del().where({ id: id }).update(updatedProduct)
    }
}

module.exports = Contenedor;

