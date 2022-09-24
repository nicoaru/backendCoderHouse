const express = require('express')
const cookieParser = require('cookie-parser')

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => console.log(`Servidor escuchando en puerto ${server.address().port}`)).on('error', (error) => console.log(`Error al intentar conectar el servidor => ${error.message}`))

app.get('/', (req, res) => {
    res.sendFile(__dirname+'/public/index.html')
})

app.post('/cookies', (req, res) => {
    // console.log("body", req.body)
    const key = req.body.key
    const value = req.body.value
    const expiration = (req.body.expiration)
    console.log("body => ", req.body)
    res.cookie(key, value, {maxAge:expiration, signed: false}).json({proceso: "ok"})
})

app.get('/cookies', (req, res) => {
    console.log(req.cookies)
    res.send(req.cookies)
})

app.delete('/cookies/:cookieName', (req, res) => {
    const key = req.params.cookieName
    console.log("cookies => ", req.cookies)
    if (req.cookies[key]) {
        res.clearCookie(key).json({proceso: `Ok. Cookie ${key} borrada`})
    }
    else {
        res.status(400).json({error: `No existe cookie ${key}`})
    }
})


//- Realizar un programa de backend que permita gestionar cookies desde el frontend. Para ello: 
//// Definir una ruta “cookies”.
//// Definir un método POST que reciba un objeto con el nombre de la cookie, su valor y el tiempo de duración en segundos, y que genere y guarde dicha cookie.
///// Definir un método GET que devuelva todas las cookies presentes.
//// Definir un método DELETE que reciba el nombre de una cookie por parámetro de ruta, y la elimine.
//// NOTA 1: Utilizar la librería express como estructura de servidor.
//// NOTA 2: Si algún parámetro recibido es inválido, o directamente inexistente, el servidor devolverá un objeto de error.
//// Ej: { error: 'falta nombre ó valor' } o { error: 'nombre no encontrado' }. Si todo sale bien, devolver el objeto { proceso: 'ok'}.
//// NOTA 3: Si el tiempo no está presente, generar una cookie sin tiempo de expiración.
//// NOTA 4:  Generar los request con varios navegadores (Chrome, edge, Firefox) para simular los distintos clientes en forma local.
