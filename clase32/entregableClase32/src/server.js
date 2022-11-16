const {generateDataProducts} = require('./utils/fakeDataGenerator.js')
const {generateRandom} = require('./calculo.js')
const { isLogged } = require('./utils/middlewares.js')
const controllers = require('./controllers.js')
const {args} = require('./args.js')
const {NODE_ENV} = require('./config.js')
const {fork} = require('child_process')
const compression = require('compression')
const gzipMiddleware = compression()
const express = require("express")
const {Server: HTTPServer} = require("http")
const {Server: SocketServer} = require("socket.io")
const {MensajesDAO} = require('./daos/daos.js')

const session = require('express-session')
const MongoStore = require('connect-mongo')
const {uriStringMongo} = require('./config.js')

const passport = require('passport');
require('./passport.js')

const {logger} = require("./logger_config.js");




// log4js
// const logger = NODE_ENV === "production"
//   ? log4js.getLogger("productionLogger")
//   : log4js.getLogger() ;

const logEndpoint = (req, res, next) => {
    logger.info(`Accedió a ruta ${req.url} - método ${req.method}`)
    next()
}


//EXPRESS
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/static', express.static('public'))
app.use(session({
    store: new MongoStore({
        mongoUrl: uriStringMongo,
        ttl: 60 * 10,
        retries: 0
    }),
    secret: 'STRING_SECRETA',
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(logEndpoint)
app.use(gzipMiddleware)



// MOCK API
app.get('/api/productos-test', isLogged, (req, res) => {
    try {
        const randomProducts = generateDataProducts(5)
        // console.log(`productos-test en puerto ${serverActualPort}, proceso ${process.pid}`)
        res.json(randomProducts)        
    }

    catch(error) {
        logger.error(`Error en ${req.url} - método ${req.method} - ${error.message}`)
        res.status(400).json({error: {status: 400, message: error.message}})
    }
})

// '/info'
app.get('/info', (req, res) => {
    try {
        const respuesta = {
            argumentos: args,
            pathEjecucion: process.execPath,
            sistemaOperativo: process.platform,
            processId: process.pid,
            nodeVersion: process.version,
            carpeta: process.cwd(),
            memoriaTotalReservada: process.memoryUsage.rss()
        }
        // console.log("/info => ", respuesta)
        res.status(200).json(respuesta)
    }
    catch(error) {
        logger.error(`Error en ${req.url} - método ${req.method} - ${error.message}`)
        res.status(400).json({error: {status: 400, message: error.message}})
    }

})

// '/api/randoms'
app.get('/api/randoms', (req, res) => {
    try {
        const cant = req.query.cant || 10000000
        const calculo = generateRandom(cant)
        res.send({info: `Servidor escuchando en puerto ${serverActualPort}, corriendo en proceso ${process.pid}`, resultado: calculo})
        
        // const cant = req.query.cant || 10000000
        // const calculo = fork('./src/calculo.js')
        // calculo.send(cant)
        // calculo.on('message', (resultado) => {
        //     res.send({info: `Servidor escuchando en puerto ${serverActualPort}, corriendo en proceso ${process.pid}`, resultado})
        // })        
    }
    catch(error) {
        logger.error(`Error en ${req.url} - método ${req.method} - ${error.message}`)
        res.status(400).json({error: {status: 400, message: error.message}})
    }
})

// '/'
app.get('/', isLogged, (req, res) => {
    res.sendFile('index.html', {root: './public/'})
})

// '/session'
app.get('/session', isLogged, (req, res) => {
    res.json(req.user)
})

// '/login'
app.get('/login', (req, res) => {
    res.sendFile('login.html', {root: './public/'})
})
app.post("/login", passport.authenticate("login"), (req, res) => {
        console.log('line 127 . Autenticado Ok')    
        res.status(200).json(req.user)
});

// '/logout'
app.delete('/logout', isLogged, (req, res) => {
    req.logout((error) => {
        if(error) {
            console.log("line 109 . error logout => ", error)
            res.json(error)
        }
        else {
            console.log("line 115 => deslogueado")
            res.status(200).json({proceso: 'ok'})        
        }
    })

})

// '/signup'
app.get('/signup', (req, res) => {
    res.sendFile('signup.html', {root: './public/'})
})
app.post('/signup', controllers.getSignup)


// ruta no existente
app.use(function(req, res, next) {
    logger.warn(`Ruta ${req.url} - método ${req.method} - no existe`)
    res.json({error: -2, descripcion: `Ruta ${req.baseUrl}${req.url}, método ${req.method}, no existe`});
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
        MensajesDAO.getAllMensajes()
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
            MensajesDAO.saveMensaje(msgObject)
            .then((res) => {

                MensajesDAO.getAllMensajes()
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




