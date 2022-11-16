const dotenv = require('dotenv')
dotenv.config()

//mongoDB
const dbType = process.env.DB_TYPE 
const uriStringMongo = process.env.MONGODB_URISTRING
//Port
const PORT = process.env.PORT
//googleCloud
const googleClientID = process.env.googleClientID
const googleClientSecret = process.env.googleClientSecret
// admin
const admin = true




module.exports = {dbType, uriStringMongo, admin, googleClientID, googleClientSecret, PORT}