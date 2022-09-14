import mongoose from "mongoose";

// Creamos el Schema 
const estudianteSchema = new mongoose.Schema({
    nombre: {type: "string", required: true},
    apellido: {type: "string", required: true},
    edad: {type: "number", required: true} ,
    dni: {type: "string", required: true, unique: true},
    curso: {type: "string", required: true},
    nota: {type: "number", required: true},
    ingreso: {type: "boolean"}
}, {timestamps: true})

// Compilamos el Schema a un Modelo con mongoose.model()
// Un modelo es una Clase con la que construimos documentos. 
// Cada documento tendrá las propiedades y comportamientos declarados en nuestro esquema. 
// El 1er parámetro es el nombre de la colección
const estudiantesModel = mongoose.model("estudiantes", estudianteSchema)

export { estudiantesModel }