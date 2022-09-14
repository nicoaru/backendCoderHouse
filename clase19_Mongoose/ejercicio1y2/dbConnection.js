import mongoose from "mongoose";

function connectToMongoDB() {
    // si tuviera user  =>  mongodb://<user>:<password>@localhost:port/db
    const URIString = "mongodb://localhost:27017/colegio"
    mongoose.connect(URIString)
    .then(res => console.log(`Respuesta conexión => conectado a ${res.connections[0]._connectionString}`))
    .catch(error => console.log("Error conexión => ", error.message))
}

export { connectToMongoDB }