const fs = require("fs")


class Contenedor {
    constructor(fileName) {
        this.fileName = fileName
    }
    // 
    save(objeto) {
        const fileName = this.fileName
        return new Promise(async (resolve, reject) => {
            // intento leer el archivo a ver si ya existe
            try {
                let itemsList
                await this.getAll().then(data => itemsList = data).catch(error => {throw error})
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
                    console.log(`El archivo no existe, vamos a crearlo`)
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
    getById(id) {
        return new Promise(async (resolve, reject) => {
            try {
                let objetoReturn
                let itemsList
                await this.getAll().then(data => itemsList = data).catch(error => {throw error})
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
            let itemsList
            await this.getAll().then(data => itemsList = data).catch(error => {throw error})
            const indexDelete = itemsList.indexOf(itemsList.find(obj => {if (obj.id === id) {return obj}}))
            if (indexDelete >= 0) {
                itemsList.splice(indexDelete, 1)
                await fs.promises.writeFile(`./${fileName}`, JSON.stringify(itemsList, null, 2), "utf-8")
                console.log(`deleteById() - Se elimino el item con id ${id}`)
            }
            else if (indexDelete < 0) { console.log(`deleteById - No existe item con Id ${id}`)}
        }
        catch(error){
            console.log("Hubo un inconveniente intentando borrar por Id => ", error)
        }
    }
    async deleteAll() {
        const fileName = this.fileName;
        try{
            await fs.promises.writeFile(`./${fileName}`, JSON.stringify([], null, 2), "utf-8")
            console.log("deleteAll() - Se eliminaron todos los items")
        }
        catch(error){
            console.log("Hubo un inconveniente intentando hacer deleteAll => ", error)
        }
    }
}

module.exports = Contenedor;

