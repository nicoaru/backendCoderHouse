const dotenv = require('dotenv')
dotenv.config()


const dbType = process.env.DB_TYPE 
const uriStringMongo = process.env.MONGODB_URISTRING
const PORT = process.env.PORT
// admin
const admin = true

module.exports = {dbType, uriStringMongo, admin, PORT}