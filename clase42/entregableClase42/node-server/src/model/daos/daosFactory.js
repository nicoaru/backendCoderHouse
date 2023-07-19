const { MensajesDaoMongoDB } = require('./mensajesDaoMongoDB.js')
const { UsersDaoMongoDB } = require('./usersDaoMongoDB.js')
const { ProductosDaoMongoDB } = require('./productosDaoMongoDB.js')
const { CarritosDaoMongoDB } = require('./carritosDaoMongoDB.js')
const { PedidosDaoMongoDB } = require('./pedidosDaoMongoDB.js')
const { DB_TYPE } = require('../../config/config.js')




let carritosDAO
let mensajesDAO
let pedidosDAO
let productosDAO
let usersDAO

class DAOsFactory {

    static getCarritosDao() {
        switch(DB_TYPE) {
            case 'MongoDB':
                if(!(carritosDAO instanceof CarritosDaoMongoDB)) {
                    carritosDAO = new CarritosDaoMongoDB()
                    return carritosDAO
                }
                else {
                    return carritosDAO;                    
                }
            case 'Firebase':
                // if(!carritosDAO instanceof CarritosDaoFirebase) {
                //     carritosDAO = new CarritosDaoFirebase()
                //     return carritosDAO
                // }
                // else {
                //     return carritosDAO;                    
                // }
                break;
            case 'MySQL':
                // if(!carritosDAO instanceof CarritosDaoMySQL) {
                //     carritosDAO = new CarritosDaoMySQL()
                //     return carritosDAO
                // }
                // else {
                //     return carritosDAO;                    
                // }
                break;
            case 'SQLite':
                // if(!carritosDAO instanceof CarritosDaoSQLite) {
                //     carritosDAO = new CarritosDaoSQLite()
                //     return carritosDAO
                // }
                // else {
                //     return carritosDAO;                    
                // }
                break;
        }
    }

    static getMensajesDao() {
        switch(DB_TYPE) {
            case 'MongoDB':
                if(!(mensajesDAO instanceof MensajesDaoMongoDB)) {
                    mensajesDAO = new MensajesDaoMongoDB()
                    return mensajesDAO
                }
                else {
                    return mensajesDAO;                    
                }
            case 'Firebase':
                // codigo...
                break;
            case 'MySQL':
                // codigo...
                break;
            case 'SQLite':
                // codigo...
                break;
        }
    }

    static getPedidosDao() {
        switch(DB_TYPE) {
            case 'MongoDB':
                if(!(pedidosDAO instanceof PedidosDaoMongoDB)) {
                    pedidosDAO = new PedidosDaoMongoDB()
                    return pedidosDAO
                }
                else {
                    return pedidosDAO;                    
                }
            case 'Firebase':
                // codigo...
                break;
            case 'MySQL':
                // codigo...
                break;
            case 'SQLite':
                // codigo...
                break;
        }
    }

    static getProductosDao() {
        console.log('DB_TYPE, ', DB_TYPE)
        switch(DB_TYPE) {
            case 'MongoDB':
                if(!(productosDAO instanceof ProductosDaoMongoDB)) {
                    productosDAO = new ProductosDaoMongoDB()
                    console.log('1 productosDAO ', productosDAO)
                    return productosDAO
                }
                else {
                    console.log('2 productosDAO ', productosDAO)
                    return productosDAO;                    
                }
            case 'Firebase':
                // codigo...
                break;
            case 'MySQL':
                // codigo...
                break;
            case 'SQLite':
                // codigo...
                break;
        }
    }

    static getUsersDao() {
        switch(DB_TYPE) {
            case 'MongoDB':
                if(!(usersDAO instanceof UsersDaoMongoDB)) {
                    usersDAO = new UsersDaoMongoDB()
                    return usersDAO
                }
                else {
                    return usersDAO;                    
                }
            case 'Firebase':
                // codigo...
                break;
            case 'MySQL':
                // codigo...
                break;
            case 'SQLite':
                // codigo...
                break;
        }
    }

}


module.exports = {
    DAOsFactory
}