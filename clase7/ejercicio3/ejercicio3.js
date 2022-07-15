const express = require("express")

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
const PORT = 8080
const server = app.listen(PORT, () => console.log(`Servidor escuchando en puerto ${server.address().port}`)).on("error", error => console.log(`Error en servidor => ${error}`))

let frase = "Frase inicial"

// GET '/api/frase': devuelve un objeto que como campo ‘frase’ contenga la frase completa
app.get("/api/frase", (req, res) => {
    res.json({frase})
})

// GET '/api/palabras/:pos': devuelve un objeto que como campo ‘buscada’ contenga la palabra hallada en la frase en la posición dada (considerar que la primera palabra es la #1.
app.get("/api/palabras/:pos", (req, res) => {
    const indexPos = req.params.pos-1
    const arrayFrase = frase.split(" ")
    const buscada = arrayFrase[indexPos]
    res.json({buscada})
})

// POST '/api/palabras': recibe un objeto con una palabra bajo el campo ‘palabra’ y la agrega al final de la frase. Devuelve un objeto que como campo ‘agregada’ contenga la palabra agregada, y en el campo ‘pos’ la posición en que se agregó dicha palabra.
app.post("/api/palabras", (req, res) => {
    const agregada = req.body.palabra
    frase = `${frase} ${agregada}`
    const posicion = frase.split(" ").length 
    console.log("Posicion ", posicion)
    res.json({agregada, posicion, frase})
})

// PUT '/api/palabras/:pos': recibe un objeto con una palabra bajo el campo ‘palabra’ y reemplaza en la frase aquella hallada en la posición dada. Devuelve un objeto que como campo ‘actualizada’ contenga la nueva palabra, y en el campo ‘anterior’ la anterior.
app.put("/api/palabras/:pos", (req, res) => {
    const pos = req.params.pos
    const palabra = req.body.palabra
    const arrayFrase = frase.split(" ")
    const eliminada = arrayFrase.splice(pos-1, 1, palabra)
    frase = arrayFrase.join(" ")
    res.json({actualizada: palabra, anterior: eliminada[0], frase})
})

// DELETE '/api/palabras/:pos': elimina una palabra en la frase, según la posición dada (considerar que la primera palabra tiene posición #1).
app.delete("/api/palabras/:pos", (req, res) => {
    const pos = req.params.pos
    const arrayFrase = frase.split(" ")
    arrayFrase.splice(pos-1, 1)
    frase = arrayFrase.join(" ") 
    res.json({frase})
})