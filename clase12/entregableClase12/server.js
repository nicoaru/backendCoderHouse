const express = require("express")
const http = require("http")
const HTTPServer = http.Server
const {Server: SocketServer} = require("socket.io")
const events = require("./socketEvents.js")
const Contenedor = require("./Contenedor");

const app = express()
app.use(express.static("public"));

// INSTANCIAS DE CONTENEDOR
const productos = new Contenedor("productos.txt")
const mensajes = new Contenedor("mensajes.txt")

// INSTANCIA DE HTTP.SERVER PASANDOLE EL OBJETO APP COMO PARAMETRO
const httpServer = new HTTPServer(app)

// INSTANCIA DE SERVER SOCKET.IO PASANDOLE LA INSTANCIA DE HTTP.SERVER COMO PARAMETRO
const socketServer = new SocketServer(httpServer) 

// CONECTO SERVIDOR
const PORT = process.env.PORT || 8080
const server = httpServer.listen(PORT, () => console.log(`Servidor escuchando en puerto ${server.address().port}`)).on("error", error => console.log(`Error conectando al servidor => ${error.message}`))

// LOGICA ENDPOINTS
app.get("./", (req, res) => {
    res.sendFile("index.html")
})  



// SOCKET
socketServer.on("connection", async (socket) => {
    console.log("Nuevo cliente conectado")

    // INIT_MESSAGES - EMIT - (manda historial de mensajes al conectarse un cliente)
    mensajes.getAll()
    .then(allMessages => {
        socket.emit("INIT_MESSAGES", allMessages)
    })
    .catch(() =>{
        const error = {error: true, message: "Hubo un error intentando descargar los mensajes"}
        socket.emit("INIT_MESSAGES", error)
    })
    // SEND_MESSAGE - ON LISTEN - (recibe nuevo mensaje enviado, lo reenvia a todos y lo agrega al historial )
    socket.on("SEND_MESSAGE", (msg) => {
        const msgObject = {socketId: socket.id, ...msg}
        mensajes.save(msgObject)
        .then((msgWithid) => {
             // RECEIVE_MESSAGE - EMIT - (reenvia a todos el mensaje enviado por un usuario)
            socketServer.emit("RECEIVE_MESSAGE", msgWithid)
        })
        .catch(error => console.log(error))
    })



    // UPDATE_PRODUCTS - EMIT - (manda lista de producstos al conectarse un cliente)
    emitUpdateProducts(socket)
    // CARGAR_PRODUCT - ON LISTEN - (recibe nuevo producto cargado, lo reenvia a todos y lo agrega a la listade productos )
    socket.on("CARGAR_PRODUCT", (product) => {
        const productObject = {socketId: socket.id, ...product}
        productos.save(productObject)
        .then(() => {
             // UPDATE_PRODUCTS - EMIT - (reenvia a todos la lista de productos actualizada)
            emitUpdateProducts(socketServer)
        })
        .catch(error => console.log(error))
    })

}) 


// OTRAS FUNCIONES
const emitUpdateProducts = (socket) => {
    productos.getAll()
    .then(allProducts => {
        console.log(allProducts)
        socket.emit("UPDATE_PRODUCTS", allProducts)
    })
    .catch(() =>{
        const error = {error: true, message: "Hubo un error intentando descargar la lista de productos"}
        socket.emit("UPDATE_PRODUCTS", error)
    })
}