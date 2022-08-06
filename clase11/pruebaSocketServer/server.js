const express = require("express")
const http = require("http")
const HTTPServer = http.Server
const {Server: SocketServer} = require("socket.io")
const events = require("./socketEvents.js")

const app = express()
app.use(express.static("public"));

// creo una nueva instancia de http.Server pasándole el objeto app como parámetro
const httpServer = new HTTPServer(app)
// creo una nueva instancia Server de socket.io (socket.io.server) pasándole el objeto httpServer como parámetro
const socketServer = new SocketServer(httpServer) 

// conecto servidor
const PORT = process.env.PORT || 8080
const server = httpServer.listen(PORT, () => console.log(`Servidor escuchando en puerto ${server.address().port}`))
.on("error", error => console.log(`Error conectando al servidor => ${error.message}`))

// logica endpoints
app.get("./", (req, res) => {
    res.sendFile("index.html")
})  

// socket
socketServer.on("connect", (socket) => {
    // console.log(socket)
    const connectionObject = {connected: true, socketId: socket.id, connectionTime: socket.handshake.time, message: "Conexión al servidor: ok"}
    // console.log("Nuevo cliente conectado => ", connectionObject)
    socket.emit(events.NEW_CONNECTION, connectionObject)
    socketServer.emit("other_user_connected", `Se conectó ${socket.id}`)
    
    console.log("nombre: ",socketServer.sockets.name, "sockets:",socketServer.allSockets())
    // console.log("sockets:",socketServer.sockets.sockets)
    // console.log(" => => ", socketServer.sockets)
}) 
