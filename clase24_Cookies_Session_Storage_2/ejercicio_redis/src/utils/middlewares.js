import { admin } from "../config.js";

const isAdmin = (req, res, next) => {
    if (!admin) {
        error = new Error(`No tiene autorización de Admin`)
        res.json({error: -1, descripcion:`Ruta ${req.baseUrl}${req.url}, método ${req.method}, no autorizado`})
    }
    else {
        next()
    }
}

const isLogged = (req, res, next) => {
    if (req.session.logged) {
        next
    }
    else {
        res.sendFile(('login.html'))
    }
}

export {isAdmin, isLogged}