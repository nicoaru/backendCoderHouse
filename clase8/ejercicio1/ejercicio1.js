const express = require("express")
const {Router} = express

// creo el server
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

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
    personas.push(req.body)
    res.json({nuevaPersona: req.body})
})

routerMascotas.get("/", (req, res) => {
    res.json(mascotas)
})

routerMascotas.post("/", (req, res) => {
    mascotas.push(req.body)
    res.json({nuevaMascota: req.body})
})


// conecto el server al puerto 8080
const PORT = 8080
const server = app.listen(8080, () => console.log(`Servidor escuchando en puerto ${server.address().port}`)).on("error", error => console.log(`Error en servidor => ${error}`))
