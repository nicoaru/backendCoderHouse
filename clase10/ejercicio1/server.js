const express = require("express")
const handlebars = require("express-handlebars")

// configuro el servidor
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
// app.use(express.static(__dirname+"/public"))
const PORT = 8080
const server = app.listen(8080, () => console.log(`Servidor escuchando en puerto ${server.address().port}`)).on("error", error => console.log(`Error en servidor => ${error}`))



// configuro el motor de plantillas
app.engine('hbs', 
    handlebars.create({
        extname: ".hbs",
        defaultLayout: "index.hbs",
        layoutsDir: __dirname+"/views/layouts",
        partialsDir: __dirname+"/views/partials/"
    }).engine
);
app.set('views', __dirname+'/views')
app.set('view engine', 'hbs')


// lógica del servidor

app.get('/', (req, res) => { 
    res.render('main', data)
})



// datos
const usuario = {nombre: 'Nicolás', apellido: 'Aruguete', email: 'nico@aru.com', edad: 35, telefono: '4856-8696'}
const comentarios = [{text: "Qué super se ve tu sitio", user: "jlopez"},
{text: "Hola", user: "smorgan"}]

const data = {usuario, comentarios}