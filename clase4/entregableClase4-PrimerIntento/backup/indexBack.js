const fs = require("fs")

// funcion que llama el metodo save()
function funcionSave(objeto, fileName) {
    return new Promise(async (resolve, reject) => {
        // intento leer el archivo a ver si ya existe
        try {
            const itemsList =  JSON.parse(await fs.promises.readFile(`./${fileName}`, "utf-8"))
            try{
                itemsList.length > 0 ? itemsList.push({...objeto, id:itemsList[itemsList.length-1].id+1}) : itemsList.push({...objeto, id:1})
                await fs.promises.writeFile(`./${fileName}`, JSON.stringify(itemsList, null, 2), "utf-8")
                resolve(itemsList[itemsList.length-1].id)
            }
            catch(error){
                reject(`Error intentando guardar nuevo item en archivo existente: ${error}`)
            }
        }
        // si el archivo no existe vamos aca:
        catch(error) {
            if (error.code === "ENOENT") {
                console.log("El archivo no existe, vamos a crearlo")
                try {
                    await fs.promises.writeFile(`./${fileName}`, JSON.stringify([{...objeto, id: 1}], null, 2), "utf-8")
                    resolve(1)
                }
                catch(error) {
                    reject(error) 
                }                
            } 
            else {
                reject(`Error intentando leer el archivo: ${error}`)
            }

        }
    })
}

// defino la class Contenedor
class Contenedor {
    constructor(fileName) {
        this.fileName = fileName
    }
    save(objeto) {
        return funcionSave(objeto, this.fileName)
    }
    getById(id) {
        let fileName = this.fileName
        return new Promise(async (resolve, reject) => {
            try {
                let objetoReturn
                const itemsList =  JSON.parse(await fs.promises.readFile(`./${fileName}`, "utf-8"))
                objetoReturn = itemsList.find(obj => {if (obj.id === id) {return obj}});
                if (objetoReturn === undefined) { objetoReturn = null}
                resolve(objetoReturn)
            }
            catch(error) {
                reject(error)
            }
        })
    
    }
    getAll() {
        const fileName = this.fileName
        return new Promise(async (resolve, reject) => {
            try {
                resolve(JSON.parse(await fs.promises.readFile(`./${fileName}`, "utf-8")))
            }
            catch(error) {
                reject(error)
            }
        })
    }
    async deleteById(id) {
        const fileName = this.fileName;
        try{
            const itemsList =  JSON.parse(await fs.promises.readFile(`./${fileName}`, "utf-8"))
            try{
                const indexDelete = itemsList.indexOf(itemsList.find(obj => {if (obj.id === id) {return obj}}))
                if (indexDelete >= 0) {
                    itemsList.splice(indexDelete, 1)
                    await fs.promises.writeFile(`./${fileName}`, JSON.stringify(itemsList, null, 2), "utf-8")
                    console.log(`deleteById() - Se elimino el item con id ${id}`)
                }
                else if (indexDelete < 0) { console.log(`deleteById - No existe item con Id ${id}`)}
            }
            catch(error){console.log("Hubo un error actualizando el archivo => ", error)}
        }
        catch(error){
            console.log("Hubo un inconveniente intentando acceder al archivo => ", error)
        }
    }
    async deleteAll() {
        const fileName = this.fileName;
        try{
            await fs.promises.writeFile(`./${fileName}`, JSON.stringify([], null, 2), "utf-8")
            console.log("deleteAll() - Se eliminaron todos los items")
        }
        catch(error){
            console.log("Hubo un inconveniente intentando acceder al archivo => ", error)
        }
    }
}

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


