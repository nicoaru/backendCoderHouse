const fs = require("fs")

const funcionPackageCoder = () => {
    fs.promises.readFile("./info.txt", "utf-8")
        .catch(error => console.log("Hubo un error al leer el archivo info.txt => ", error.message))
        .then(data => {
            const info = JSON.parse(data)
            console.log("Objeto info => ", info)
            return info
        })
            .catch(error => console.log("Hubo un error al deserializar el contenido del archivo info.txt => ", error.message))
            .then(info => {
                const infoContenidoObj = info.contenidoObj
                infoContenidoObj.author = "Coderhouse"
                fs.promises.writeFile("./package.json.coder", JSON.stringify(infoContenidoObj, null, 4))
            })
            .catch(error => console.log("Hubo un error al guardar el nuevo archivo json => ", error.message))
            .then(() => console.log("Todo salio bien vieja"))
    .finally(() => console.log("Terminamos..."))
}

funcionPackageCoder()