const { isLogged } = require('./utils/middlewares.js')
const controllers = require('./controllers.js')
const compression = require('compression')
const gzipMiddleware = compression()
const express = require("express")
const {Server: HTTPServer} = require("http")
const {Server: SocketServer} = require("socket.io")
const {MensajesDAO} = require('./daos/daos.js')
const {ProductosDAO} = require('./daos/daos.js')
const {routerProductos} = require('./routes/routerProductos.js')
const {routerCarritos} = require('./routes/routerCarritos.js')
const {routerPedidos} = require('./routes/routerPedidos.js')
const {generateDataProducts} = require('./utils/fakeDataGenerator.js')
const session = require('express-session')
const MongoStore = require('connect-mongo') //conecta express-session a mongoDB
const {uriStringMongo} = require('./config.js')
const {sendMail} = require('./nodeMailer.js')


const {logger, logEndpoint} = require("./logger_config.js");






const passport = require('passport');
require('./passport.js')
//EXPRESS
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// app.use('/static', express.static('public'))
app.use(session({
    secret: 'STRING_SECRETA',
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({
      mongoUrl: uriStringMongo,
      retries: 0,
      ttl: 60 * 10, // 10 minutos
    }),
  })
);
app.use(logEndpoint)
app.use(gzipMiddleware)
app.use(passport.initialize())
app.use(passport.session())
app.use("/api/productos", routerProductos)
app.use("/api/carritos", routerCarritos)
app.use("/api/pedidos", routerPedidos)



// '/session'
app.get('/session', isLogged, (req, res) => {
    console.log("/session req.user ", req.user)
    res.json(req.user)
})

// '/login'
app.post("/login", passport.authenticate("login"), (req, res) => {
        console.log('line 127 . Autenticado Ok')    
        res.status(200).json(req.user)
});

// '/logout'
app.delete('/logout', isLogged, (req, res) => {
    req.logout((err) => {
        if(err) {
            console.log("error logout => ", err)
            const error = {ok: false, error: true, message:"Error intentando cerrar sesión... por las dudas intentá de nuevo"}
            res.status(400).json(error)
        }
        else {
            console.log("deslogueado")
            res.status(200).json({ok: true, loged: "false", user: req.user})        
        }
    })

})

// '/signup'
app.post('/signup', controllers.postSignup)

// '/gaenerateProductosFake'
app.post('/generateProductosFake', async (req, res) => {
    
    const productsArray = generateDataProducts(10)
    const _result = await ProductosDAO.saveMany(productsArray)
    console.log("fake products result ", _result)
})

// ruta no existente
app.use(function(req, res, next) {
    logger.warn(`Ruta ${req.url} - método ${req.method} - no existe`)
    res.status(400).json({error: true, message: `Ruta ${req.baseUrl}${req.url}, método ${req.method}, no existe`});
    next();
});



// INSTANCIA DE HTTP.SERVER PASANDOLE EL OBJETO APP COMO PARAMETRO
const httpServer = new HTTPServer(app)


// INSTANCIA DE SERVER SOCKET.IO PASANDOLE LA INSTANCIA DE HTTP.SERVER COMO PARAMETRO
const socketServer = new SocketServer(httpServer) 


// SOCKET
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







let serverActualPort 
// FUNCIÓN CONECTAR SERVIDOR
function connectServer (port) {
    const server = httpServer.listen(port, () => {
        serverActualPort = server.address().port
        console.log(`Servidor escuchando en puerto ${serverActualPort}. Proceso ${process.pid}`)
    })
    .on("error", error => console.log(`Error conectando al servidor => ${error.message}`))
    
    return server
}



module.exports = {connectServer}











// app.get('/api/productos-test', isLogged, (req, res) => {
//     try {
//         const randomProducts = generateDataProducts(5)
//         // console.log(`productos-test en puerto ${serverActualPort}, proceso ${process.pid}`)
//         res.json(randomProducts)        
//     }

//     catch(error) {
//         logger.error(`Error en ${req.url} - método ${req.method} - ${error.message}`)
//         res.status(400).json({error: {status: 400, message: error.message}})
//     }
// })

// // '/info'
// app.get('/info', (req, res) => {
//     try {
//         const respuesta = {
//             argumentos: args,
//             pathEjecucion: process.execPath,
//             sistemaOperativo: process.platform,
//             processId: process.pid,
//             nodeVersion: process.version,
//             carpeta: process.cwd(),
//             memoriaTotalReservada: process.memoryUsage.rss()
//              puerto: serverActualPort
//         }
//         res.status(200).json(respuesta)
//     }
//     catch(error) {
//         logger.error(`Error en ${req.url} - método ${req.method} - ${error.message}`)
//         res.status(400).json({error: {status: 400, message: error.message}})
//     }
// })

// // '/api/randoms'
// app.get('/api/randoms', (req, res) => {
//     try {
//         const cant = req.query.cant || 10000000
//         const calculo = generateRandom(cant)
//         res.send({info: `Servidor escuchando en puerto ${serverActualPort}, corriendo en proceso ${process.pid}`, resultado: calculo})
        
//         // const cant = req.query.cant || 10000000
//         // const calculo = fork('./src/calculo.js')
//         // calculo.send(cant)
//         // calculo.on('message', (resultado) => {
//         //     res.send({info: `Servidor escuchando en puerto ${serverActualPort}, corriendo en proceso ${process.pid}`, resultado})
//         // })        
//     }
//     catch(error) {
//         logger.error(`Error en ${req.url} - método ${req.method} - ${error.message}`)
//         res.status(400).json({error: {status: 400, message: error.message}})
//     }
// })

// '/'