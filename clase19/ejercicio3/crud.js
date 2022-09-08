import {connectToMongoDB} from "./dbConnection.js";
import { estudiantesModel } from "./models/estudiantes.js";

(async() => {
    // Conectar a la DB
    await connectToMongoDB();

    /// 1) Actualizar el dni del estudiante Lucas Blanco a 20355875
    try{
        const result = await estudiantesModel.updateOne({nombre: "Lucas", apellido: "Blanco"}, {$set: {dni:20355875}})
        console.log("1) update => ", result)
    }
    catch(error){
        console.log("1) update error => ", error.message)
    };        

    // 2) Agregar un campo 'ingreso' a todos los documentos con el valor false
    try{
        const result = await estudiantesModel.updateMany({}, {$set: {"ingreso": false}})
        console.log("2) update => ", result)
    } 
    catch(error){
        console.log("2) update error => ", error.message)
    };

    /// 3) Modificar el valor de 'ingreso' a true para todos los estudiantes que pertenezcan al curso 1A
    try{
        const result = await estudiantesModel.updateMany({curso: "1A"}, {$set: {ingreso:true}})
        console.log("3) update => ", result) 
    } 
    catch(error){
        console.log("3) update error => ", error.message)
    };

    // 4) Listar los estudiantes que aprobaron (hayan sacado de 4 en adelante) sin los campos de _id y __v
    try{
        const result = await estudiantesModel.find({nota: {$gte:4}}, {_id:0, __v:0})
        console.log("4) find => ", result)
    }
    catch(error){
        console.log("4) find error => ", error.message)
    };

    // 5) Listar los estudiantes que posean el campo 'ingreso' en true sin los campos de _id y __v
    try{
        const result = await estudiantesModel.find({ingreso:true}, {_id:0, __v:0})
        console.log("5) find => ", result)
    }
    catch(error){
        console.log("5) find error => ", error.message)
    };

    // 6) Borrar de la colección de estudiantes los documentos cuyo campo 'ingreso' esté en true
    try{
        const result = await estudiantesModel.deleteMany({ingreso:true})
        console.log("6) delete => ", result)
    }
    catch(error){
        console.log("6) delete error => ", error.message)
    };

// 7) Listar el contenido de la colección estudiantes utilizando la consola, imprimiendo en cada caso los datos almacenados (sin el campo __v) junto a su fecha de creación obtenida del ObjectID en formato YYYY/MM/DD HH:mm:SS. 
// Por ejemplo: 
// {"_id":"604df61b5e39a84ba41313e4","nombre":"Fabio","apellido":"Pieres","edad":39,"dni":"4315388","curso":"1B","nota":9,"ingreso":false} -> Fecha creación:  14/3/2021 08:40:11
    try{
        const result = await estudiantesModel.find({}, {_v:0})
        console.log("7) find => ")
        result.forEach(element => console.log(element, `Fecha de creación => `, element._id.getTimestamp().toLocaleString()))
    }
    catch(error){
        console.log("7) find error => ", error.message)
    };

})()








