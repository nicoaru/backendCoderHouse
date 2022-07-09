const Contenedor = require("./Contenedor");

// defino los objetos que voy a guardar en el archivo
const objeto1 = {
    title: "Escuadra",
    price: 250, 
    thumbnail: "urlImg"
}
const objeto2 = {
    title: "Regla",
    price: 150, 
    thumbnail: "urlImg"
}
// creo el objeto productos como instancia de la clase Contenedor
const productos = new Contenedor("productos.txt")

// ejecuto los metodos
productos.save(objeto1).then(data => console.log("save() - El id del primer objeto guardado es => ", data)).catch(error => console.log("hubo un error en save 1 => ", error))

setTimeout(() => productos.save(objeto2).then(data => console.log("save() - El id del segundo objeto guardado es => ", data)).catch(error => console.log("hubo un error en save 2 => ", error)), 1000)

setTimeout(() => productos.getAll().then(data => console.log("getAll() - El archivo contiene lo siguiente => ", data)).catch( error => console.log("Hubo un error viendo que tiene el archivo => ", error)), 1500)


setTimeout(() => {productos.getById(2).then(data => console.log(`getById() - Objeto requerido => `, data)).catch(error => console.log("error => ", error))}, 2000)

setTimeout(() => {productos.getById(35).then(data => console.log(`getById() - Objeto requerido => `, data)).catch(error => console.log("error => ", error))}, 3000)

setTimeout(() => productos.deleteById(1), 4000)

setTimeout(() => productos.deleteById(255), 5000)

setTimeout(() => productos.getAll().then(data => console.log("getAll() - El archivo contiene lo siguiente => ", data)).catch( error => console.log("Hubo un error viendo que tiene el archivo => ", error)), 6000)

setTimeout(() => productos.deleteAll(), 7000)

setTimeout(() => productos.getAll().then(data => console.log("getAll() - El archivo contiene lo siguiente => ", data)).catch( error => console.log("Hubo un error viendo que tiene el archivo => ", error)), 8000)
