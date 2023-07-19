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
const isLogged = (req, res, next) => {
    if (req.isAuthenticated()) {
        console.log("Está logueado")
        next()
    }
    else {
        console.log("No está logueado - user: ", req.user)
        const error = {error: true, loged: "false", message: 'Not loged', user: req.user}
        res.status(401).json(error)
    }
}

module.exports = {isAdmin, isLogged}