const express = require("express")
const fs = require("fs")

// configuro el servidor
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname+"/public"))

// configuro el motor de plantillas
app.engine('ptl', function (filePath, options, callback) {
    fs.readFile(filePath, function (err, content) {
      if (err) {
        return callback(new Error(err));
      }
      const rendered = content.toString()
                              .replace('^^titulo$$', options.titulo)
                              .replace('^^mensaje$$', options.mensaje)
                              .replace('^^autor$$', options.autor)
                              .replace('^^version$$', options.version)
                              .replace('^^nombre$$', options.nombre)
                              .replace('^^apellido$$', options.apellido)
                              .replace('^^fecha$$', options.fecha.toLocaleDateString());
      return callback(null, rendered);
    });
  });
  
app.set('views', __dirname+'/views')
app.set('view engine', 'ptl')

const PORT = 8080
const server = app.listen(8080, () => console.log(`Servidor escuchando en puerto ${server.address().port}`)).on("error", error => console.log(`Error en servidor => ${error}`))


// lógica del servidor

app.get('/', (req, res) => {

    res.sendFile('index.html')
})

app.get('/ptl1', (req, res) => {
    res.render('plantilla1', mensaje)
})

app.get('/ptl2', (req, res) => {
    res.render('plantilla2', usuario)
})


// datos
const mensaje = {
    titulo: "Reflexiones del dia",
    mensaje: "Hoy fue un día caluroso de invierno",
    autor: "Nico Aru",
    version: 2.0
}

const usuario = {
    nombre: 'Nicolás',
    apellido: 'Aru',
    fecha: new Date()
}