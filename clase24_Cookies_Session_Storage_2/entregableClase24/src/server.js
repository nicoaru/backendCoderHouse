const express = require("express")
const {Server: HTTPServer} = require("http")
const {Server: SocketServer} = require("socket.io")
const {generateDataProducts} = require('./utils/fakeDataGenerator.js')
const {MensajesDAO, UsersDAO} = require('./daos/daos.js')
const {normalizeMensajes, denormalizeMensajes} = require('./utils/normalize.js')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const {uriStringMongo} = require('./config.js')



//EXPRESS
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use('/static', express.static('public'))


app.use(session({
    store: new MongoStore({
        mongoUrl: uriStringMongo,
        ttl: 60 * 10,
        retries: 0
    }),
    secret: 'STRING_SECRETA',
    resave: false,
    saveUninitialized: true
  }))




// MOCK API
app.get('/api/productos-test', (req, res) => {
    const randomProducts = generateDataProducts(5)
    res.json(randomProducts)
})

app.get('/', (req, res) => {
    console.log("req.session => ", req.session)
    if(req.session.user) {
        res.sendFile('index.html', {root: './public/'})
    }
    else {
        res.sendFile('login.html', {root: './public/'})
    }
})

// SESSION

app.get('/session', (req, res) => {
    res.json(req.session)
})

app.post('/session/login', (req, res) => {
    console.log("body => ", req.body)
    console.log("session => ", req.session)
    if(req.session?.user) {
        res.sendFile('index.html', {root: './public/'})
    }
    else {
        req.session.user = req.body.user
        res.json(req.session)

    }
})

app.get('/session/logout', (req, res) => {
    const session = req.session
    req.session.destroy(error => {
        if(error) {
            res.status(500).json(error.message)
        }
        else {
            res.status(200).json({session, result: 'Sesión cerrada'})
        }
    })
})





// INSTANCIA DE HTTP.SERVER PASANDOLE EL OBJETO APP COMO PARAMETRO
const httpServer = new HTTPServer(app)

// FUNCIÓN CONECTAR SERVIDOR
function connectServer (port) {
    const server = httpServer.listen(port, () => console.log(`Servidor escuchando en puerto ${server.address().port}`)).on("error", error => console.log(`Error conectando al servidor => ${error.message}`))
    return server
}



module.exports = {connectServer}




