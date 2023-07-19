const {createUser} = require('../service/cotrollers/controllerUsers.js')
const { UsersDAO} = require("../model/daos/daos.js")
const { Router } = require("express")
const {isLogged} = require('../utils/middlewares.js')
const routerUsers = Router()
const passport = require('passport')
require('../service/passport.js')

// '/'
routerUsers.get('/logged', isLogged, (req, res) => {
    console.log("/users/logged req.user ", req.user)
    res.json(req.user)
})

// '/login'
routerUsers.post("/login", passport.authenticate("login"), (req, res) => {
        console.log('line 127 . Autenticado Ok')    
        res.status(200).json(req.user)
});

// '/logout'
routerUsers.delete('/logout', isLogged, (req, res) => {
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
routerUsers.post('/signup', createUser)

module.exports = {routerUsers}
