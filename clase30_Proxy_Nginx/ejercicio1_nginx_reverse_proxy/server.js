const express = require('express')
const args = process.argv.splice(2)
const app = express()
const PORT = Number(args[0]) || 8080
const server = app.listen(PORT, () => console.log(`Servidor escuchando en puerto ${server.address().port}. Proceso ${process.pid}`)).on('error', (error) => console.log(`Error al intentar conectar el servidor => ${error.message}`))

// app.use(express.static("./public"))

app.get('/datos', (req, res) => {
    res.status(200).send(`Servidor express en puerto ${server.address().port} - ${process.pid} - ${new Date().toLocaleDateString()}`)
})


//  ejecutar desde la consola con alguno de estos 2 comandos:
//  . pm2 start server.js --name="Server1" --watch -- 8081
//  . pm2 start server.js --name="Server2" --watch -i max -- 8082