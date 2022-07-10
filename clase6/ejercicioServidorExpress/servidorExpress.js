const express = require("express")
const app = express()

const server = app.listen(8080, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
 }).on( "error", function(error) { console.log(`Error en servidor ${error}`) } )

app.get("/", (req, res) => {
    res.send("<h1 style='color:blue'>Bienvenidos al servidor Express</h1>")
})
let nVisitas = 0

app.get("/visitas", (req, res) => {
    nVisitas++
    res.send(`La cantidad de visitas es ${nVisitas}`)
})

app.get("/fyh", (req, res) => {
    const fecha = new Date().toLocaleString()
    res.send({fecha})
})