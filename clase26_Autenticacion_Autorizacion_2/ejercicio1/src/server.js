const {generateDataProducts} = require('./utils/fakeDataGenerator.js')
const { createHash, compareHash } = require('./utils/utils.js')
const {uriStringMongo} = require('./config.js')
const { isLogged } = require('./utils/middlewares.js')
const {Users} = require('./models/usersModel.js')
const {Types} = require('mongoose');

const express = require("express")
const {Server: HTTPServer} = require("http")

const session = require('express-session')
const MongoStore = require('connect-mongo')

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;



// PASSPORT AUTHENTICATION CONFIGURATION


passport.use('login', new LocalStrategy( async (username, password, done) => {
    try {
        console.log(`line 24 . username: ${username}, password: ${password}`)
        const _user = await Users.findOne({username: username})
        console.log("line 26 . _user => ", _user)
        // if(!_user || !(password === _user.password)){
        if(!_user || !(compareHash(password, _user.password))){
            console.log(`line 29 . No autenticado`)
            return done(null, false, {result: "Usuario o contraseña incorrectos"})
        }
        else {
            console.log("line 34 . Autenticado => ", _user)
            return done(null, _user)
        }
    }
    catch(error) {
        console.log(`line 39 . Error autenticando => ${error.message}`)
        return done(error)
    }    
}))



passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  
  passport.deserializeUser(async (id, done) => {
    id = Types.ObjectId(id);
    const user = await Users.findById(id);
    done(null, user);
  });



//EXPRESS
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/static', express.static('public'))
app.use(session({
    store: new MongoStore({
        mongoUrl: uriStringMongo,
        ttl: 60 * 2,
        retries: 0
    }),
    secret: 'STRING_SECRETA',
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())




// MOCK API
app.get('/api/productos-test', (req, res) => {
    const randomProducts = generateDataProducts(5)
    res.json(randomProducts)
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
app.delete('/logout', (req, res) => {
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
app.post('/signup', async (req, res) => {
    try {
        let _user = await Users.findOne({username: req.body.username})
        console.log(`line 120 . _user => `, _user)
        if(!req.body.username || !req.body.email || !req.body.password) {
            console.log(`line 122 . failed signp => `, 'Usuario, Email válido y Contraseña son obligatorios')
           res.status(400).json({error: true, message: 'Usuario, Email válido y Contraseña son obligatorios'})
        }
        else if (_user) {
            console.log(`line 126 . failed signup => `, 'Nombre de usuario ya existente')
            // res.status(400).send('Nombre de usuario ya existente')
            res.status(400).json({error: true, message: 'Nombre de usuario ya existente'})
        }
        else {
            _newUser = new Users({
                username: req.body.username, 
                password: createHash(req.body.password),
                email: req.body.email, 
                telephone: req.body.telephone, 
                avatar: req.body.avatar
            })
            _newUser.save()
            .then(user => {
                console.log(`line 139 . usuario creado => `, user)
                res.status(200).json(user)
            })
            .catch(error => {
                console.log('line 143 . error _newUser.save( )=> ', error)
                throw error
            })
        }
    }
    catch(error) {
        console.log(`line 149 . Error signup => `, error)
        res.json(error)
    }
})



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




