const mongoose = require("mongoose")
const dotenv = require("dotenv")

// import mongoose from "mongoose";
// import dotenv from "dotenv";

dotenv.config();
const MONGODB_URISTRING = process.env.MONGODB_URISTRING


async function connectToMongoDB() {
    const URIString = MONGODB_URISTRING
    await mongoose.connect(URIString)
    .then(res => console.log(`Respuesta conexión => conectado a ${res.connections[0]._connectionString}`))
    .catch(error => console.log("Error conexión => ", error.message))
}

module.exports = { connectToMongoDB }

// export { connectToMongoDB }