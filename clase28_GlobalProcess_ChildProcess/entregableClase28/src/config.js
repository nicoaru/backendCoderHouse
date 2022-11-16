const dotenv = require('dotenv')
dotenv.config()
const {port} = require('./args.js')


const uriStringMongo = process.env.MONGODB_URISTRING

const ADMIN = process.env.ADMIN
const PORT = port || 8080

module.exports = {uriStringMongo, ADMIN, PORT}