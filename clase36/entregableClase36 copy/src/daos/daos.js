const { MensajesDaoMongoDB } = require('./mensajesDaoMongoDB.js')
const { MensajesModel } = require('../models/mensajesModel.js');
const { UsersDaoMongoDB } = require('./usersDaoMongoDB.js')
const { UsersModel } = require('../models/usersModel.js');
const { ProductosDaoMongoDB } = require('./productosDaoMongoDB.js')
const { ProductosModel } = require('../models/productosModel.js');
const { CarritosDaoMongoDB } = require('./carritosDaoMongoDB.js')
const { CarritosModel } = require('../models/carritosModel.js');


const MensajesDAO = new MensajesDaoMongoDB(MensajesModel)
const UsersDAO = new UsersDaoMongoDB(UsersModel)
const ProductosDAO = new ProductosDaoMongoDB(ProductosModel)
const CarritosDAO = new CarritosDaoMongoDB(CarritosModel)

module.exports = { MensajesDAO, UsersDAO, ProductosDAO, CarritosDAO }