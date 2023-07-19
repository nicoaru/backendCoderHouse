const {socketServer} = require('./server.js')

socketServer.on("connection", async (socket) => {
    console.log("Nuevo cliente conectado")

    // CHAT //
    // INIT_MESSAGES - EMIT - (manda historial de mensajes al conectarse un cliente)
    try {
        MensajesDAO.getAll()
        .then(allMessages => {
            console.log("allMaessages => ", allMessages)
            socket.emit("INIT_MESSAGES", allMessages)
            // socket.emit("INIT_MESSAGES", allMessages)
        })
        .catch((e) =>{
            const error = {error: true, message: "Hubo un error intentando descargar los mensajes"}
            logger.error(`Error intentando descargar los mensajes - socket ${socket.id} - ${e.message}`)
            socket.emit("INIT_MESSAGES", error)
        })
    }
    catch(e) {
        logger.error(`Error intentando descargar los mensajes - socket ${socket.id} - ${e.message}`)
    }
    // SEND_MESSAGE - ON LISTEN - (recibe nuevo mensaje enviado, lo reenvia a todos y lo agrega al historial )
    socket.on("SEND_MESSAGE", (msg) => {
        try{
            const msgObject = msg
            console.log("mensaje recibido en servidor => ", msg)
            MensajesDAO.save(msgObject)
            .then((res) => {

                MensajesDAO.getAll()
                .then(allMessages => {
                    socketServer.emit("INIT_MESSAGES", allMessages)
                    // socket.emit("INIT_MESSAGES", allMessages)
                })
                .catch((e) =>{
                    const error = {error: true, message: "Hubo un error intentando descargar los mensajes"}
                    logger.error(`Error intentando descargar los mensajes - socket ${socket.id} - ${e.message}`)
                    socketServer.emit("INIT_MESSAGES", error)
                })

            })
            .catch(e => logger.error(`Error intentando guardar mensaje en la DB - socket ${socket.id} - ${e.message}`))
        }
        catch(e) {
            logger.error(`Error intentando guardar mensaje en la DB - socket ${socket.id} - ${e.message}`)
        }
    })
}) 
