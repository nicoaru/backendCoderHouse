//- get() con params

const express = require("express")

const app = express()
const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor conectado escuchando en puerto ${server.address().port}`)
}).on("error", error => console.log(`Error en servidor => ${error}`))

const frase = "Hola mundo cómo están"

// app.get("/api/frase", (req, res) => {
//     res.json({frase: frase})
// })

app.get("/api/letras/:n", (req, res) => {
    const n = parseInt(req.params.n)
    if (Number.isNaN(n)) 
        {res.json({error: "El parámetro no es un número"})}
    else if (n < 1 || n > frase.length) 
        {res.json({error: "El parámetro está fuera de rango"})}
    else 
        {res.json({letra: frase[n-1]})}
})

app.get("/api/palabras/:n", (req, res) => {
    const fraseUnida = frase.split(" ")
    const n = parseInt(req.params.n)
    if (Number.isNaN(n)) 
        {res.json({error: "El parámetro no es un número"})}
    else if (n < 1 || n > fraseUnida.length) 
        {res.json({error: "El parámetro está fuera de rango"})}
    else 
        {res.json({letra: fraseUnida[n-1]})}
})


//- get() con querys
app.get("/api/frase", (req, res) => {
    console.log("Query => ", req.query)
    console.log(Object.entries(req.query))
    if (Object.entries(req.query).length > 0) 
        {res.json(
            {mensaje: "Se recibio un request con querys",
            querys: {...req.query}}
        )}
    else 
        {res.json({frase})}
})