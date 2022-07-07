const cp = require("child_process")
const fs = require("fs")

//- Version con posible callback hell
const funcionPackage = () => {
    cp.exec("npm init -y", (error) => {
        if (error) {console.log("no se pudo crear el archivo package.json => ", error.message)}
        else {
            fs.readFile("./package.json", "utf-8", (error, data) => {
            if (error) {console.log("Algo salió mal leyendo el archivo package.json")}
            else {
                try{const info = {
                    contenidoStr: data,
                    contenidoObj: JSON.parse(data)}
                    console.log("info => ", info)
                    fs.writeFile("./info.txt", JSON.stringify(info, null, 2), (error) => {
                        if (error) {
                        console.log("Algo falló al guardar el archivo info.txt => ", error.message)
                        } else { console.log("Terminééééé")}
                    })
                }
                catch(error) {console.log("Algo salio mal al construir el objeto => ", error.message)}
            }
            })
        }
    })
}




funcionPackage()