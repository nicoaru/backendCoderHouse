const express = require("express")
const handlebars = require("express-handlebars")

// configuro el servidor
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname+"/public"))
const PORT = 8080
const server = app.listen(8080, () => console.log(`Servidor escuchando en puerto ${server.address().port}`)).on("error", error => console.log(`Error en servidor => ${error}`))



// configuro el motor de plantillas
app.set('views', __dirname+'/views')
app.set('view engine', 'pug')


// lógica del servidor

app.get('/datos', (req, res) => {
    const data = req.query
    console.log(data)
    res.render('datos', data)
})


