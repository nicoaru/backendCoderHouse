const {connectServer, socketServer} = require('./server.js')
const {PORT} = require('./config.js')
const {connectToMongoDB} = require('./dbConnection.js')
const {uriStringMongo} = require('./config.js')

//CONNECT SERVER
const server = connectServer(PORT)
//CONNECT MONGODB
connectToMongoDB(uriStringMongo)


