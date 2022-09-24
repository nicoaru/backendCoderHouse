const express = require("express")
const {Server: HTTPServer} = require("http")
const {generateDataProducts} = require('./utils/fakeDataGenerator.js')
const session = require('express-session')
const redis = require('redis')
const RedisStore = require('connect-redis')(session)
const redisClient = redis.createClient({legacyMode: true})

redisClient.connect().catch(error => console.log(`redisClient error de conexión => `, error))

// NO PUDE CONECTARME A REDISLAB


//EXPRESS
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use('/static', express.static('public'))


app.use(session({
    store: new RedisStore({ 
        client: redisClient,
        host: 'redis-17738.c277.us-east-1-3.ec2.cloud.redislabs.com',
        port: 17738,
        ttl: 15
    }),
    secret: 'STRING_SECRETA',
    resave: false,
    saveUninitialized: false,
    ttl: 60
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




