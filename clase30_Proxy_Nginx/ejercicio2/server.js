const cluster = require('cluster')
const nCpus = require('os').cpus().length
const express = require('express')
const args = process.argv.splice(2)
const serverMode = args[0]
const PORT = args[1] || 8080
const app = express()

// console.log("args: ", args)

// console.log("PORT: ", PORT)

// console.log("serverMode: ", serverMode)


if(serverMode==='CLUSTER' && cluster.isPrimary) {
    console.log(`nCpus `, nCpus)    
    console.log(`Primary process n° ${process.pid} is runing`)

    for (let i = 0; i < nCpus; i++) {
        const worker = cluster.fork()
        worker.send({PORT, serverMode})
    }    

    cluster.on('exit', () => {
        console.log(`cluster en PID N° ${process.pid} se cerro`)
        cluster.fork()
    })

    // console.log(cluster.workers)
    console.log("N° de procesos hijos creados: ", Object.entries(cluster.workers).length)
}
else if (serverMode==='CLUSTER') {
    let PORT
    let serverMode

    process.on('message', (data) => {
        // console.log("data: ", data)
        PORT = data.PORT
        serverMode = data.serverMode

        // console.log("port ", PORT)
        // console.log("mode ", serverMode)
        const server = app.listen(PORT, () => console.log(`Servidor escuchando en puerto ${server.address().port}. Proceso ${process.pid}`)).on('error', (error) => console.log(`Error al intentar conectar el servidor => ${error.message}`))

        app.use(express.static('./public'))

        app.get('/info', (req, res) => {
            console.log(`Servidor express en puerto ${server.address().port} - ${process.pid} - ${new Date().toLocaleDateString()}`)
            res.status(200).send(`Servidor express en puerto ${server.address().port} - ${process.pid} - ${new Date().toLocaleDateString()}`)
        })
    })
}
else {
    const server = app.listen(PORT, () => console.log(`Servidor escuchando en puerto ${server.address().port}. Proceso ${process.pid}`)).on('error', (error) => console.log(`Error al intentar conectar el servidor => ${error.message}`))

    app.use(express.static('./public'))

    app.get('/info', (req, res) => {
        console.log(`Servidor express en puerto ${server.address().port} - ${process.pid} - ${new Date().toLocaleDateString()}`)
        res.status(200).send(`Servidor express en puerto ${server.address().port} - ${process.pid} - ${new Date().toLocaleDateString()}`)
    })
}


