const fs = require("fs")


const funcionPackageCoder = async () => {
    let info
    try {
        info = JSON.parse((await fs.promises.readFile("./info.txt", "utf-8")))
        console.log("Objeto info => ", info)
    }
    catch (error) {console.log("Algo ha fallado, al leer el archivo package.json y crear el objeto info => ", error)}
    try {
        const infoContenidoObj = info.contenidoObj
        infoContenidoObj.author = "Coderhouse"
        console.log("infoContenidoObj => ", infoContenidoObj)
        await fs.promises.writeFile("./package.json.coderAsyncAwait", JSON.stringify(infoContenidoObj, null, 4))
        console.log("Todo salio bien vieja")
    }
    catch (error) {console.log("Algo ha fallado, al crear el nuevo archivo package.json.coder => ", error)}
    finally {console.log("Terminamos...")}
}

funcionPackageCoder()