require('dotenv').config()
const express = require("express")
const http = require("http")
const HTTPServer = http.Server
const {Server: SocketServer} = require("socket.io")
const events = require("./socketEvents.js")
const Contenedor = require("./utils/Contenedor");
const knexConfigProductos = require('./knexfileMysql')
const knexConfigMensajes = require('./knexfileSqlite')
const app = express()
app.use(express.static(__dirname+"/public"))

// INSTANCIAS DE CONTENEDOR
const productos = new Contenedor(knexConfigProductos, "productos")
const mensajes = new Contenedor(knexConfigMensajes, "mensajes")

// INSTANCIA DE HTTP.SERVER PASANDOLE EL OBJETO APP COMO PARAMETRO
const httpServer = new HTTPServer(app)
// INSTANCIA DE SERVER SOCKET.IO PASANDOLE LA INSTANCIA DE HTTP.SERVER COMO PARAMETRO
const socketServer = new SocketServer(httpServer) 

// CONECTO SERVIDOR
const PORT = process.env.PORT 
const server = httpServer.listen(PORT, () => console.log(`Servidor escuchando en puerto ${server.address().port}`)).on("error", error => console.log(`Error conectando al servidor => ${error.message}`))

// LOGICA ENDPOINTS
// app.get("/", (req, res) => { 
//     res.sendFile("index.html")
// })  



// SOCKET
socketServer.on("connection", async (socket) => {
    console.log("Nuevo cliente conectado")

    // CHAT //
    // INIT_MESSAGES - EMIT - (manda historial de mensajes al conectarse un cliente)
    mensajes.getAll()
    .then(allMessages => {
        socket.emit("INIT_MESSAGES", allMessages)
    })
    .catch((e) =>{
        const error = {error: true, message: "Hubo un error intentando descargar los mensajes"}
        console.log(e)
        socket.emit("INIT_MESSAGES", error)
    })

    // SEND_MESSAGE - ON LISTEN - (recibe nuevo mensaje enviado, lo reenvia a todos y lo agrega al historial )
    socket.on("SEND_MESSAGE", (msg) => {
        const msgObject = {socketId: socket.id, ...msg}
        mensajes.save(msgObject)
        .then((id) => {

             // RECEIVE_MESSAGE - EMIT - (reenvia a todos el mensaje enviado por un usuario)
            socketServer.emit("RECEIVE_MESSAGE", {id, ...msgObject})
        })
        .catch(error => console.log(error))
    })


    // PRODUCTOS //
    // PRODUCTS_LIST - EMIT - (manda lista de producstos al conectarse un cliente)
    emitProductsList(socket)
    
    // CARGAR_PRODUCT - ON LISTEN - (recibe nuevo producto, lo agrega a la base de datos, y reenvia la products_list actualizada a todos)
    socket.on("CARGAR_PRODUCT", (product) => {
        const productObject = {timeStamp: Date.now(), ...product}
        productos.save(productObject)
        .then(() => {
            emitProductsList(socketServer)
        })
        .catch(error => console.log(error))
    })
    
    // DELETE_PRODUCT - ON LISTEN - (recibe un id , elimina el producto de la base de datos, y reenvia la products_list actualizada a todos)
    socket.on("DELETE_PRODUCT", (id) => {
        productos.deleteById(id)
        .then(res => {
            console.log("return de DELETE => ", res)
            console.log("id => ", id)
            emitProductsList(socketServer)
        })
    })
}) 


// OTRAS FUNCIONES
const emitProductsList = (socket) => {
    productos.getAll()
    .then(allProducts => {
        console.log("all products => ", allProducts)
        socket.emit("PRODUCTS_LIST", allProducts)
    })
    .catch((e) =>{
        const error = {error: true, message: "Hubo un error intentando descargar la lista de productos"}
        console.log(e)
        socket.emit("PRODUCTS_LIST", error)
    })
}