const express = require("express")
const {Server: HTTPServer} = require("http")
const {generateDataProducts} = require('./utils/fakeDataGenerator.js')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const {uriStringMongo} = require('./config.js')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const { createHash, compareHash } = require('./utils/utils.js')
const {Types} = require('mongoose')
const {Users} = require('./models/usersModel.js')
const { isLogged } = require('./utils/middlewares.js')


// PASSPORT AUTHENTICATION CONFIGURATION
passport.use('login', new LocalStrategy( async (username, password, done) => {
    try {
        console.log(`username: ${username}, password: ${password}`)
        const _user = await Users.findOne({username: username})
        console.log("_user => ", _user)
        if(!_user || !(compareHash(password, _user.password))){
            console.log(`No autenticado => `)
            return done(null, false, {result: "Usuario o contraseña incorrectos"})
        }
        else {
            delete _user.password
            console.log("Autenticado => ", _user)
            return done(null, _user)
        }
    }
    catch(error) {
        console.log(`Error autenticando => ${error.message}`)
        return done(error)
    }    
}))

passport.use('signup', new LocalStrategy({passReqToCallback: true}, async (req, username, password, done) => {
    try {
        let _user = await Users.findOne({username: username})
        if(_user) {
            return done(null, false, {result: 'Nombre de usuario ya existente'})
        }
        else {
            _user = new Users({
                username: req.body.username, 
                password: createHash(req.body.password),
                email: req.body.email, 
                telephone: req.body.telephone
            })
            _user = await _user.save()
            delete _user.password
            return done(null, _user)
        }
    }
    catch(error) {
        return done(error, false)
    }
}))

passport.serializeUser((user, done) => {
    done(null, user._id);
})

passport.deserializeUser(async (id, done) => {
    try {
        const _id = Types.ObjectId(id)
        const _user = await Users.findOne({_id: id})
        delete _user.password
        return done(null, _user)
    }
    catch(error) {
        return done(error, false)
    }
})



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
    saveUninitialized: false
}))
app.use(passport.session());



// MOCK API
app.get('/api/productos-test', (req, res) => {
    const randomProducts = generateDataProducts(5)
    res.json(randomProducts)
})


app.get('/', isLogged, (req, res) => {
    res.sendFile('index.html', {root: './public/'})    }
)

app.get('/login', (req, res) => {
    res.sendFile('login.html', {root: './public/'})

})
// app.post('/login', passport.authenticate('login', {
//     failureRedirect: '/', failureMessage: true}), (req, res) => {
//     console.log("user => ", req.session.user)
//     res.sendFile('index.html', {root: './public/'})
// })

 
app.post("/login", passport.authenticate("login", {failureMessage: true}), (req, res) => {
    console.log('autenticado ok')    
    // res.redirect('/')
});



// // SESSION
// app.get('/session', (req, res) => {
//     res.json(req.session)
// })

// app.post('/session/login', (req, res) => {
//     console.log("body => ", req.body)
//     console.log("session => ", req.session)
//     if(req.session?.user) {
//         res.sendFile('index.html', {root: './public/'})
//     }
//     else {
//         req.session.user = req.body.user
//         res.json(req.session)

//     }
// })

// app.get('/session/logout', (req, res) => {
//     const session = req.session
//     req.session.destroy(error => {
//         if(error) {
//             res.status(500).json(error.message)
//         }
//         else {
//             res.status(200).json({session, result: 'Sesión cerrada'})
//         }
//     })
// })





// INSTANCIA DE HTTP.SERVER PASANDOLE EL OBJETO APP COMO PARAMETRO
const httpServer = new HTTPServer(app)

// FUNCIÓN CONECTAR SERVIDOR
function connectServer (port) {
    const server = httpServer.listen(port, () => console.log(`Servidor escuchando en puerto ${server.address().port}`)).on("error", error => console.log(`Error conectando al servidor => ${error.message}`))
    return server
}



module.exports = {connectServer}




