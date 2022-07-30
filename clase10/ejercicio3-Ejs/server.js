const express = require("express")
const ejs = require("ejs")

// configuro el servidor
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname+"/public"))
const PORT = 8080
const server = app.listen(8080, () => console.log(`Servidor escuchando en puerto ${server.address().port}`)).on("error", error => console.log(`Error en servidor => ${error}`))

// configuro el motor de plantillas
app.set('view engine', 'ejs')


// lógica del servidor

app.get('/', (req, res) => {
    res.render('./pages/cargaDatos', {historial})
})
 
app.post('/personas/', (req, res) => {
    console.log(req.body)
    if(req.body.nombre && req.body.apellido && req.body.edad) {
        historial.push(req.body)
        res.redirect('/')
    }
    else{
        res.send("Faltan datos")

    }
})

app.get('/personas/delete', (req, res) =>  { 
    historial.splice(0)
    console.log("historial => ", historial)
    res.redirect('/')
 })


// datos
const historial = []