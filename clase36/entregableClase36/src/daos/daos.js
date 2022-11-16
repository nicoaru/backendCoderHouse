const { MensajesDaoMongoDB } = require('./mensajesDaoMongoDB.js')
const { MensajesModel } = require('../models/mensajesModel.js');
const { UsersDaoMongoDB } = require('./usersDaoMongoDB.js')
const { UsersModel } = require('../models/usersModel.js');


const MensajesDAO = new MensajesDaoMongoDB(MensajesModel)
const UsersDAO = new UsersDaoMongoDB(UsersModel)

module.exports = { MensajesDAO, UsersDAO }