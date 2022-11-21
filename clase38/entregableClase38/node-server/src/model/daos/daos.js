const { MensajesDaoMongoDB } = require('./mensajesDaoMongoDB.js')
const { MensajesModel } = require('../models/mensajesModel.js');
const { UsersDaoMongoDB } = require('./usersDaoMongoDB.js')
const { UsersModel } = require('../models/usersModel.js');
const { ProductosDaoMongoDB } = require('./productosDaoMongoDB.js')
const { ProductosModel } = require('../models/productosModel.js');
const { CarritosDaoMongoDB } = require('./carritosDaoMongoDB.js')
const { CarritosModel } = require('../models/carritosModel.js');
const { PedidosDaoMongoDB } = require('./pedidosDaoMongoDB.js')
const { PedidosModel } = require('../models/pedidosModel.js');


const MensajesDAO = new MensajesDaoMongoDB(MensajesModel)
const UsersDAO = new UsersDaoMongoDB(UsersModel)
const ProductosDAO = new ProductosDaoMongoDB(ProductosModel)
const CarritosDAO = new CarritosDaoMongoDB(CarritosModel)
const PedidosDAO = new PedidosDaoMongoDB(PedidosModel)

module.exports = { MensajesDAO, UsersDAO, ProductosDAO, CarritosDAO, PedidosDAO }