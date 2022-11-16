const {generateDataProducts} = require('./utils/fakeDataGenerator.js')
const { isLogged } = require('./utils/middlewares.js')
const controllers = require('./controllers.js')
const {args} = require('./args.js')
const {fork} = require('child_process')

const express = require("express")
const {Server: HTTPServer} = require("http")

const session = require('express-session')
const MongoStore = require('connect-mongo')
const {uriStringMongo} = require('./config.js')

const passport = require('passport');

require('./passport.js')


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




// MOCK API
app.get('/api/productos-test', isLogged, (req, res) => {
    const randomProducts = generateDataProducts(5)
    console.log(`productos-test en puerto ${serverActualPort}, proceso ${process.pid}`)
    res.json(randomProducts)
})

// '/info'
app.get('/info', (req, res) => {
    const respuesta = {
        argumentos: args,
        pathEjecucion: process.execPath,
        sistemaOperativo: process.platform,
        processId: process.pid,
        nodeVersion: process.version,
        carpeta: process.cwd(),
        memoriaTotalReservada: process.memoryUsage.rss()
    }
    res.send(respuesta)
})

// '/api/randoms'
app.get('/api/randoms', (req, res) => {
    const cant = req.query.cant || 100000000
    const calculo = fork('./src/calculo.js')
    calculo.send(cant)
    calculo.on('message', (resultado) => {
        res.send({info: `Servidor escuchando en puerto ${serverActualPort}, corriendo en proceso ${process.pid}`, resultado})
    })
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
app.post("/login", 
    passport.authenticate("login"), 
    (req, res) => {
        console.log('line 127 . Autenticado Ok')    
        res.status(200).json(req.user)
    }
);

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


// INSTANCIA DE HTTP.SERVER PASANDOLE EL OBJETO APP COMO PARAMETRO
const httpServer = new HTTPServer(app)

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




