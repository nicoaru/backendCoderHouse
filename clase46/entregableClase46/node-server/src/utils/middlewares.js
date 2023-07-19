const { admin } = require("../config/config.js");

const isAdmin = (req, res, next) => {
    if (!admin) {
        error = new Error(`No tiene autorización de Admin`)
        res.json({error: -1, descripcion:`Ruta ${req.baseUrl}${req.url}, método ${req.method}, no autorizado`})
    }
    else {
        next()
    }
}

// utilizo el método req.isAuthenticated() que provee passport
const isLogged = async (ctx, next) => {
    console.log("Entró al middleware isLogged")
    if (ctx.isAuthenticated()) {
        console.log("Está logueado")
        await next()
    }
    else {
        console.log("No está logueado - user: ", ctx.request.user)
        const error = {error: true, loged: "false", message: 'Not loged', user: ctx.request.user}
        ctx.status = 401
        ctx.body = error
    }
}

module.exports = {isAdmin, isLogged}