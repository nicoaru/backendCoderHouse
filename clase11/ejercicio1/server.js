const express = require("express")
const http = require("http")
const HTTPServer = http.Server
const {Server: SocketServer} = require("socket.io")
const events = require("./socketEvents.js")

const app = express()
app.use(express.static("public"));

const mensajes = []

// creo una nueva instancia de http.Server pasándole el objeto app como parámetro
const httpServer = new HTTPServer(app)
// creo una nueva instancia Server de socket.io (socket.io.server) pasándole el objeto httpServer como parámetro
const socketServer = new SocketServer(httpServer) 

// conecto servidor
const PORT = process.env.PORT || 8081
const server = httpServer.listen(PORT, () => console.log(`Servidor escuchando en puerto ${server.address().port}`))
.on("error", error => console.log(`Error conectando al servidor => ${error.message}`))

// logica endpoints
app.get("./", (req, res) => {
    res.sendFile("index.html")
})  

// socket
socketServer.on("connect", async (socket) => {
    // console.log(socket)
    // const connectionObject = {connected: true, socketId: socket.id, handshakeTime: socket.handshake.time, message: "Conexión al servidor: ok"}
    socket.emit("ALL_MESSAGES", mensajes)
    socket.on("SEND_MESSAGE", (msg) => {
        const msgObject = {socketId: socket.id, ...msg}
        mensajes.push(msgObject)
        socketServer.emit("NEW_MESSAGE", msgObject)
    })
    
    console.log("namespace: ",socketServer.sockets.name, "sockets:",await socketServer.allSockets())

}) 
