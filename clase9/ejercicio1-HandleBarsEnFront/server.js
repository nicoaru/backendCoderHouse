const express = require("express")

// configuro el servidor
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname+"/public"))

const PORT = 8080
const server = app.listen(8080, () => console.log(`Servidor escuchando en puerto ${server.address().port}`)).on("error", error => console.log(`Error en servidor => ${error}`))


// lógica del servidor


app.get('/', (req, res) => {

    res.sendFile('index.html')
})