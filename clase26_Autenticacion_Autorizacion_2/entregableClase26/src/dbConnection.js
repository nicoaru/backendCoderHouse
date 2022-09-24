const mongoose = require("mongoose");

async function connectToMongoDB(URIString) {
    // si tuviera user  =>  mongodb://<user>:<password>@localhost:port/db
    await mongoose.connect(URIString)
    .then(res => console.log(`Respuesta conexión => conectado a ${res.connections[0]._connectionString}`))
    .catch(error => console.log("Error conexión => ", error.message))
}

module.exports = { connectToMongoDB }