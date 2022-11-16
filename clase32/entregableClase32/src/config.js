const dotenv = require('dotenv')
dotenv.config()
const {port, serverMode} = require('./args.js')


const uriStringMongo = process.env.MONGODB_URISTRING

const ADMIN = process.env.ADMIN
const PORT = port || 8080
const SERVER_MODE = serverMode === 'CLUSTER' ? 'CLUSTER' : 'FORK'
const NODE_ENV = process.env.NODE_ENV || 'development'

module.exports = {uriStringMongo, ADMIN, PORT, SERVER_MODE, NODE_ENV}