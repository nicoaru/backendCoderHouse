const fs = require("fs")


class Contenedor {
    constructor(fileName) {
        this.fileName = fileName
    }

    //Guarda un nuevo producto en el archivo
    save(objeto) {
        const fileName = this.fileName
        return new Promise(async (resolve, reject) => {
            //lectura
            await this.getAll()
            .then(async data => {
                const itemsList = data
                const newId = itemsList.length === 0 ? 1 : itemsList.at(-1).id+1
                itemsList.push({id:newId,...objeto})
                //escritura
                try{
                    await fs.promises.writeFile(`./${fileName}`, JSON.stringify(itemsList, null, 2), "utf-8")
                    resolve(newId)
                }
                catch(error){ reject(error) }
            })
            .catch(async error => {
                //si no existe el archivo y hay que crearlo
                if(error.code === "ENOENT") {
                    try{
                        const newId = 1
                        const itemsList = [{id:newId, ...objeto}]
                        await fs.promises.writeFile(`./${fileName}`, JSON.stringify(itemsList, null, 2), "utf-8")
                        resolve(newId)
                    }
                    catch(error){reject(error)}
                }
                //Si hubo otro error
                else{reject(error)}
            })
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
            else if (indexDelete < 0) { console.log(`deleteById() - No existe item con Id ${id}`)}
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

