const {fork} = require('child_process')
const express = require("express")
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

let visitas = 0

app.get('/', (req, res) => {
    res.send({visitas: ++visitas})
})

app.get('/calculo-bloq', (req, res) => {
    const resultado = sumar()
    res.send({resultado})
})

app.get('/calculo-nobloq', (req, res) => {
    const calculo = fork('./calculo.js')
    calculo.send('start')
    calculo.on('message', (msg) => {
        res.send({resultado: msg})
    })
    
})


const sumar = () => {
    let suma = 0
    for (let i = 0; i<=6e9; i++) {
        suma+=1
    }
    return suma
}



const server = app.listen(8080, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
 }).on( "error", error => console.log(`Error en servidor ${error}`))