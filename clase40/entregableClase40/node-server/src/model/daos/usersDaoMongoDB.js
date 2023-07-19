const {ContenedorMongoDB} = require('../contenedores/contenedorMongoDB.js');
const {UsersModel} = require('../models/usersModel.js')
const mongoose = require("mongoose");
const Types = mongoose.Types

class UsersDaoMongoDB extends ContenedorMongoDB {
  
  constructor() {
    super(UsersModel)
  }

}

module.exports = {UsersDaoMongoDB}