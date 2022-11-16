const express = require('express')
const args = process.argv.splice(2)
const app = express()
const PORT = Number(args[0]) || 8080
const server = app.listen(PORT, () => console.log(`Servidor escuchando en puerto ${server.address().port}. Proceso ${process.pid}`)).on('error', (error) => console.log(`Error al intentar conectar el servidor => ${error.message}`))



app.get('/', (req, res) => {
    res.status(200).send(`Servidor express en puerto ${server.address().port} - ${process.pid} - ${new Date().toLocaleDateString()}`)
})

