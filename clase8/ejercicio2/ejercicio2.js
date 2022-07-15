const express = require("express")
const {Router} = express

// creo el server
const app = express()
// lo configuro
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname+"/public"))
// middlewares
app.use(function (req, res, next) {
    const date = Date()
    req.date = date
    console.log("middleware => ", req.date)
    next()
})
// creo los routers
const routerPersonas = Router()
app.use("/personas", routerPersonas)
const routerMascotas = Router()
app.use("/mascotas", routerMascotas)



// lógica de endpoints
let personas = []
let mascotas = []
 
routerPersonas.get("/", (req, res) => {
    res.json(personas)
})

routerPersonas.post("/", (req, res) => {
    personas.push({...req.body, dateCreation: req.date})
    res.json({nuevaPersona: req.body, personas})
}) 

routerMascotas.get("/", (req, res) => {
    res.json(mascotas)
})

routerMascotas.post("/", (req, res) => {
    mascotas.push({...req.body, dateCreation: req.date})
    res.json({nuevaMascota: req.body})
})


// conecto el server al puerto 8080
const PORT = 8080
const server = app.listen(8080, () => console.log(`Servidor escuchando en puerto ${server.address().port}`)).on("error", error => console.log(`Error en servidor => ${error}`))
