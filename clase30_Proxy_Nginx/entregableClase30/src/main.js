const {connectServer, socketServer} = require('./server.js')
const cluster = require('cluster')
const nCpus = require('os').cpus().length
const {PORT, SERVER_MODE} = require('./config.js')
const {connectToMongoDB} = require('./dbConnection.js')
const {uriStringMongo} = require('./config.js')

    //CONNECT MONGODB
    connectToMongoDB(uriStringMongo)


if(SERVER_MODE === 'CLUSTER' && cluster.isPrimary) {
    console.log(`nCpus `, nCpus)    
    console.log(`Primary process n° ${process.pid} is runing`)


    for (let i = 0; i < nCpus; i++) {
        cluster.fork()
    }    

    cluster.on('exit', () => {
        console.log(`cluster en PID N° ${process.pid} se cerro`)
        cluster.fork()
    })

    // console.log(cluster.workers)
    console.log("N° de procesos hijos creados: ", Object.entries(cluster.workers).length)
}
else {
    //CONNECT SERVER
    const server = connectServer(PORT)    
}





