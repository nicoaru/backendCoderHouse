const cluster = require('cluster')
const nCpus = require('os').cpus().length
const express = require('express')
const args = process.argv.splice(2)
const app = express()
const PORT = 8081





if(cluster.isPrimary) {
    console.log(`nCpus `, nCpus)    
    console.log(`Primary process n° ${process.pid} is runing`)

    for (let i = 0; i < nCpus; i++) {
        cluster.fork()
    }    

    cluster.on('exit', () => {
        console.log(`cluster en PID N° ${process.pid} se cerro`)
        cluster.fork()
    })
}
else {
    // console.log(`Worker corriendo en proceso n° ${process.pid}`)
    const server = app.listen(PORT, () => console.log(`Servidor escuchando en puerto ${server.address().port}. Proceso ${process.pid}`)).on('error', (error) => console.log(`Error al intentar conectar el servidor => ${error.message}`))

    app.get('/', (req, res) => {
        res.status(200).send(`Servidor express en puerto ${server.address().port} - ${process.pid} - ${new Date().toLocaleDateString()}`)
    })

}