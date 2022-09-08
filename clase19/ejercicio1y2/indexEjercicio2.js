import mongoose from "mongoose";
import {connectToMongoDB} from "./dbConnection.js";
import {estudiantesModel} from "./models/estudiantes.js";

// Conexión con la base de datos

connectToMongoDB();

// a) Los estudiantes ordenados por orden alfabético según sus nombres.
estudiantesModel.find().sort({nombre:1})
.then(res => console.log("a) ", res))
.catch(error => console.log("a) ", error))

// b) El estudiante más joven.
estudiantesModel.find().sort({edad:1}).limit(1)
.then(res => console.log("b) ", res))
.catch(error => console.log("b) ", error))

// c) Los estudiantes que pertenezcan al curso '2A'.
estudiantesModel.find({curso: "2A"})
.then(res => console.log("c) ", res))
.catch(error => console.log("c) ", error))

// d) El segundo estudiante más joven.
estudiantesModel.find().sort({edad:1}).skip(1).limit(1)
.then(res => console.log("d) ", res))
.catch(error => console.log("d) ", error))

// e) Sólo los nombres y apellidos de los estudiantes con su curso correspondiente, ordenados por apellido descendente (z a a).
estudiantesModel.find({}, {_id:0, nombre:1, apellido:1, curso:1}).sort({apellido:-1})
.then(res => console.log("e) ", res))
.catch(error => console.log("e) ", error))

// f) Los estudiantes que sacaron 10.
estudiantesModel.find({nota:10}, {_id:0, nombre:1, apellido:1, nota:1})
.then(res => console.log("f) ", res))
.catch(error => console.log("f) ", error))

// g) El promedio de notas del total de alumnos.
estudiantesModel.find({}, {_id:0, nota:1})
.then(res => {
    const notas = [] 
    res.forEach(element => {notas.push(element.nota)});
    const promedio = notas.reduce((a,b) => a+b)/notas.length
    console.log("g) ", promedio)
})
.catch(error => console.log("g) ", error))

// h) El promedio de notas del curso '1A'.
estudiantesModel.find({curso:"1A"}, {_id:0, nota:1})
.then(res => {
    const notas = [] 
    res.forEach(element => {notas.push(element.nota)});
    const promedio = notas.reduce((a,b) => a+b)/notas.length
    console.log("h) ", promedio)
})
.catch(error => console.log("h) ", error))