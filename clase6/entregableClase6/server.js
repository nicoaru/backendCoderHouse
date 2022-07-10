const express = require("express")
const Contenedor = require("./Contenedor");

const contenedorProductos = new Contenedor("productos.txt")

const app = express()
const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
 }).on( "error", function(error) { console.log(`Error en servidor ${error}`) } )

app.get("/", (req, res) => {
    res.send("<h1 style='color:blue'>Bienvenidos al servidor</h1> <h3>Podes intentar '/productos' y '/productoRandom'</h3>")
})

app.get("/productos", async (req, res) => {
    let response
    await contenedorProductos.getAll()
    .then(data => {response = data})
    .catch(error => {console.log("Hubo un error con el servidor => ", error); response = `Hubo un error con el servidor => ${error}`})
    res.send(response)
})

app.get("/productoRandom", async (req, res) => {
    let productos
    let response
    await contenedorProductos.getAll()
    .then(data => {productos = data})
    .catch(error => {console.log("Hubo un error con el servidor => ", error); response = `Hubo un error con el servidor => ${error}`})
    const getRandomIndex = (max) => { return Math.floor(Math.random() * max) }
    const randomProduct = productos[getRandomIndex(productos.length)]
    response = randomProduct
    res.send(response)      
})