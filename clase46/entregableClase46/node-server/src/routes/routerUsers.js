const {createUser} = require('../service/cotrollers/controllerUsers.js')
const { UsersDAO} = require("../model/daos/daos.js")
const {isLogged} = require('../utils/middlewares.js')
const passport = require('koa-passport')
require('../service/passport.js')
const Router = require('koa-router')
const routerUsers = new Router({
    prefix: '/api/users'
})


// '/'
routerUsers.get('/logged', isLogged, (ctx) => {
    console.log("/users/logged req.user ", ctx.state.user)
    ctx.body = ctx.state.user
    ctx.status = 200
})

'/login'
routerUsers.post("/login", passport.authenticate("login"), (ctx) => {
        console.log('line 20 . Autenticado Ok')
        ctx.body = ctx.state.user      
        ctx.status = 200
});

// '/logout'
routerUsers.delete('/logout', isLogged, async (ctx) => {
    console.log("Entro a logout")
    try {
        ctx.logout()
        if(ctx.state.user) throw new Error("Sigue estando ctx.state.user")
        console.log("Deslogueo - user: ", ctx.state.user)
        ctx.body = {ok: true, loged: "false", user: ctx.state.user}
        ctx.status = 200
        }
    catch(err) {
            console.log("error logout => ", err)
            const error = {ok: false, error: true, message:"Error intentando cerrar sesión... por las dudas intentá de nuevo"}
            ctx.body = error
            ctx.status = 400
    }
})

// '/signup'
routerUsers.post('/signup', createUser)

module.exports = {routerUsers}
