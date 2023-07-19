const { ProductosRepository } = require("./productos.repository");







class Repositories {

    static productosRepository


    getProductosRepository() {
        if(!productosRepository) {
            productosRepository = new ProductosRepository
            return productosRepository
        }
        else {
            return productosRepository
        }
    }


}


module.exports = {
    Repositories
}