const { errorMonitor } = require("events")
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
                itemsList.push({id:newId, timestamp: Date.now(), ...objeto})
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
                        const itemsList = [{id:newId, timestamp: Date.now(), ...objeto}]
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
    // Devuelve el objeto con el id indicado
    getById(id) {
        return new Promise(async (resolve, reject) => {
            try {
                let item
                let itemsList
                await this.getAll()
                    .then(data => itemsList = data)
                    .catch(error => {throw error})
                item = itemsList.find(obj => {if (obj.id === id) {return obj}});
                if (item === undefined) {
                    item = null
                }
                resolve(item)
            }
            catch(error) {
                reject(error)
            }
        })
    }
    // devuelve la lista de objetos almacenados
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
    // elimina el objeto con el id indicado
    async deleteById(id) {
        const fileName = this.fileName;
        try{
            let itemsList

            await this.getAll()
            .then(data => itemsList = data)
            .catch(error => {throw error})
            
            const indexDelete = itemsList.indexOf(itemsList.find(obj => {if (obj.id === id) {return obj}}))
            if (indexDelete >= 0) {
                itemsList.splice(indexDelete, 1)
                await fs.promises.writeFile(`./${fileName}`, JSON.stringify(itemsList, null, 2), "utf-8")
                console.log(`deleteById() - Se elimino el item con id ${id}`)
                return `Se elimino el item con id ${id}`
            }
            else if (indexDelete < 0) { 
                console.log(`deleteById() - No existe item con Id ${id}`)
                throw Error(`No existe item con id ${id}`)
                console.log(error)
            }
        }
        catch(error){
            console.log("Hubo un inconveniente intentando borrar por Id => ", error)
            return {error: `Hubo un inconveniente procesando la solicitud: ${error.message}`}
        }
    }
    // elimina todos los objetos
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
    // actualiza el objeto con el id indicado
    updateById(updatedProduct, id) {
        const fileName = this.fileName;
        return new Promise(async (resolve, reject) => {
            try {
                let itemsList;

                await this.getAll()
                .then(data => itemsList = data)
                .catch(error => {throw error});

                const indexToUpdate = itemsList.indexOf(itemsList.find(obj => {if (obj.id === id) {return obj}}));

                if (indexToUpdate >= 0) {
                    itemsList.splice(indexToUpdate, 1, updatedProduct)
                    await fs.promises.writeFile(`./${fileName}`, JSON.stringify(itemsList, null, 2), "utf-8")
                    console.log(`Se actualizó el item con id ${id}`)
                    resolve(itemsList.find(obj => {if (obj.id === id) { return obj}}))
                }
                else if (indexToUpdate < 0) { 
                    console.log(`No existe item con Id ${id}`)
                    const error = Error(`No existe item con Id ${id}`)
                    error.httpStatusCode = 400
                    console.log(error)
                    reject(error)
                };
            }
            catch(error) {
                console.log("Error => ", error)
                reject(error)
            }
        })
    }

// METODOS QUE ACTUAN SOBRE ARRAY DE UN ITEM
    // agrega un producto a un carrito determinado
    addToItemArray(product, cartId, arrayName) {
        const fileName = this.fileName;
        return new Promise(async (resolve, reject) => {
            try {
                let cartsList;

                await this.getAll()
                .then(data => cartsList = data)
                .catch(error => {throw error});

                const cartIndex = cartsList.indexOf(cartsList.find(obj => {if (obj.id === cartId) {return obj}}));

                if (cartIndex >= 0) {
                    cartsList[cartIndex][arrayName].push(product)
                    await fs.promises.writeFile(`./${fileName}`, JSON.stringify(cartsList, null, 2), "utf-8")
                    console.log(`Se agregó el producto con id ${product.id} al carrito ${cartId}`)
                    resolve({mensaje:`Se agregó el producto con id ${product.id} al carrito ${cartId}`, carrito: cartId, productos: cartsList[cartIndex][arrayName]})
                }
                else if (cartIndex < 0) { 
                    console.log(`No existe carrito con Id ${cartId}`)
                    const error = Error(`No existe carrito con Id ${cartId}`)
                    error.httpStatusCode = 400
                    console.log(error)
                    reject(error)
                };
            }
            catch(error) {
                console.log("Error => ", error)
                reject(error)
            }
        })
    }

    // elimina un producto de un carrito determinado
    deleteFromItemArray(productId, cartId, arrayName) {
        const fileName = this.fileName;
        return new Promise(async (resolve, reject) => {
            try {
                let cartsList;

                await this.getAll()
                .then(data => cartsList = data)
                .catch(error => {throw error});

                const cartIndex = cartsList.indexOf(cartsList.find(obj => {if (obj.id === cartId) {return obj}}));
                
                const productIndex = cartsList[cartIndex][arrayName].indexOf(cartsList[cartIndex][arrayName].find(obj => {if (obj.id === productId) {return obj}}));
                
                if (productIndex >= 0) {
                    cartsList[cartIndex][arrayName].splice(productIndex, 1)
                    await fs.promises.writeFile(`./${fileName}`, JSON.stringify(cartsList, null, 2), "utf-8")
                    console.log(`Se eliminó el producto con id ${productId} del carrito ${cartId}`)
                    resolve({mensaje:`Se eliminó el producto con id ${productId} del carrito ${cartId}`, carrito: cartId, productos: cartsList[cartIndex][arrayName]})
                }
                else if (productIndex < 0) { 
                    console.log(`No hay producto con Id ${productId} en el carrito ${cartId}`)
                    const error = Error(`No hay producto con Id ${productId} en el carrito ${cartId}`)
                    error.httpStatusCode = 400
                    console.log(error)
                    reject(error)
                };
            }
            catch(error) {
                console.log("Error => ", error)
                reject(error)
            }
        })
    }
    
}

module.exports = Contenedor;

