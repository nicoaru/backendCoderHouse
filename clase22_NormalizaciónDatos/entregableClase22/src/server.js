const express = require("express")
const {Server: HTTPServer} = require("http")
const {Server: SocketServer} = require("socket.io")
const {generateDataProducts} = require('./utils/fakeDataGenerator.js')
const {MensajesDAO, UsersDAO} = require('./daos/daos.js')
const {normalizeMensajes, denormalizeMensajes} = require('./utils/normalize.js')
const {print} = require('./utils/utils.js')


// EXPRESS
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
// MOCK API
app.get('/api/productos-test', (req, res) => {
    const randomProducts = generateDataProducts(5)
    res.json(randomProducts)
})

// INSTANCIA DE HTTP.SERVER PASANDOLE EL OBJETO APP COMO PARAMETRO
const httpServer = new HTTPServer(app)

// FUNCIÓN CONECTAR SERVIDOR
function connectServer (port) {
    const server = httpServer.listen(port, () => console.log(`Servidor escuchando en puerto ${server.address().port}`)).on("error", error => console.log(`Error conectando al servidor => ${error.message}`))
    return server
}

// INSTANCIA DE SERVER SOCKET.IO PASANDOLE LA INSTANCIA DE HTTP.SERVER COMO PARAMETRO
const socketServer = new SocketServer(httpServer) 


// SOCKET
socketServer.on("connection", async (socket) => {
    console.log("Nuevo cliente conectado")

    // CHAT //
    // INIT_MESSAGES - EMIT - (manda historial de mensajes al conectarse un cliente)
    MensajesDAO.getAllMensajes()
    .then(allMessages => {
        const normalizedMsgs = normalizeMensajes(allMessages)
        // console.log("normalized => ", normalizedMsgs)
        const denormalizedMsgs = denormalizeMensajes(normalizedMsgs)
        console.log("DEnormalized => ", denormalizedMsgs)
        socket.emit("INIT_MESSAGES", normalizedMsgs)
        // socket.emit("INIT_MESSAGES", allMessages)
    })
    .catch((e) =>{
        const error = {error: true, message: "Hubo un error intentando descargar los mensajes"}
        console.log(e)
        socket.emit("INIT_MESSAGES", error)
    })

    // SEND_MESSAGE - ON LISTEN - (recibe nuevo mensaje enviado, lo reenvia a todos y lo agrega al historial )
    socket.on("SEND_MESSAGE", (msg) => {
        const msgObject = msg
        console.log("mensaje recibido en servidor => ", msg)
        MensajesDAO.saveMensaje(msgObject)
        .then((res) => {

            MensajesDAO.getAllMensajes()
            .then(allMessages => {
                const normalizedMsgs = normalizeMensajes(allMessages)
                // console.log("normalized => ", normalizedMsgs)
                // const denormalizedMsgs = denormalizeMensajes(normalizedMsgs)
                // console.log("DEnormalized => ", denormalizedMsgs)
                socket.emit("INIT_MESSAGES", normalizedMsgs)
        
                // socket.emit("INIT_MESSAGES", allMessages)
            })
            .catch((e) =>{
                const error = {error: true, message: "Hubo un error intentando descargar los mensajes"}
                console.log(e)
                socket.emit("INIT_MESSAGES", error)
            })

        })
        .catch(error => console.log(error))
    })
}) 



module.exports = {connectServer, socketServer}