const compression = require('compression')
const gzipMiddleware = compression()
// const express = require("express")
const Koa = require('koa')
const {koaBody} = require('koa-body')
const {Server: HTTPServer} = require("http")
const {Server: SocketServer} = require("socket.io")
const {MensajesDAO} = require('./model/daos/daos.js')
const {routerProductos} = require('./routes/routerProductos.js')
const {routerCarritos} = require('./routes/routerCarritos.js')
const {routerPedidos} = require('./routes/routerPedidos.js')
const {routerUsers} = require('./routes/routerUsers.js')
const {routerFake} = require('./routes/routerFake.js')
// const session = require('express-session')
const session = require('koa-session')
const MongoStore = require('connect-mongo') //conecta express-session a mongoDB
const {MONGODB_URISTRING} = require('./config/config.js')
const passport = require('koa-passport');
var cors = require('cors')
const {logger, logEndpoint} = require("./profilling/logger_config.js");








//EXPRESS
// const app = express()
// app.use(express.json())
// app.use(express.urlencoded({ extended: false }))
// app.use('/static', express.static('public'))
// session

const app = new Koa()
app.use(koaBody())

app.keys = ['STRING_SECRETA']
app.use(session(app));

// app.use(session({
//     secret: 'STRING_SECRETA',
//     resave: false,
//     saveUninitialized: true,
//     store: new MongoStore({
//       mongoUrl: MONGODB_URISTRING,
//       retries: 0,
//       ttl: 60 * 10, // 10 minutos
//     }),
//   })
// );

// some middlewares
app.use(logEndpoint)
// app.use(cors())
// app.use(gzipMiddleware)

// passport
require('./service/passport.js')
app.use(passport.initialize())
app.use(passport.session())
// //



// routes
app.use(routerProductos.routes())
app.use(routerCarritos.routes())
app.use(routerPedidos.routes())
app.use(routerUsers.routes())
app.use(routerFake.routes())
// ruta no existente
app.use((ctx) => {
    logger.warn(`Ruta ${ctx.request.host}${ctx.request.url} - método ${ctx.request.method} - no existe`)
    ctx.status = 400
    ctx.body = {error: true, message: `Ruta ${ctx.request.host}${ctx.request.url}, método ${ctx.request.method}, no existe`}
});



// INSTANCIA DE HTTP.SERVER PASANDOLE EL OBJETO APP COMO PARAMETRO
const httpServer = new HTTPServer(app)

// INSTANCIA DE SERVER SOCKET.IO PASANDOLE LA INSTANCIA DE HTTP.SERVER COMO PARAMETRO
const socketServer = new SocketServer(httpServer) 

// SOCKET





let serverActualPort 
// FUNCIÓN CONECTAR SERVIDOR
function connectServer (port) {
    const server = app.listen(port, () => {
        serverActualPort = server.address().port
        console.log(`Servidor escuchando en puerto ${serverActualPort}. Proceso ${process.pid}`)
    })
    .on("error", error => console.log(`Error conectando al servidor => ${error.message}`))
    
    return server
}



module.exports = {
    connectServer, 
    socketServer,
    serverActualPort,
    httpServer
}











