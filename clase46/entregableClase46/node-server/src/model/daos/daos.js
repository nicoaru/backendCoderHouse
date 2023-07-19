const { MensajesDaoMongoDB } = require('./mensajesDaoMongoDB.js')
const { UsersDaoMongoDB } = require('./usersDaoMongoDB.js')
const { ProductosDaoMongoDB } = require('./productosDaoMongoDB.js')
const { CarritosDaoMongoDB } = require('./carritosDaoMongoDB.js')
const { PedidosDaoMongoDB } = require('./pedidosDaoMongoDB.js')


const MensajesDAO = new MensajesDaoMongoDB()
const UsersDAO = new UsersDaoMongoDB()
const ProductosDAO = new ProductosDaoMongoDB()
const CarritosDAO = new CarritosDaoMongoDB()
const PedidosDAO = new PedidosDaoMongoDB()


module.exports = { MensajesDAO, UsersDAO, ProductosDAO, CarritosDAO, PedidosDAO }