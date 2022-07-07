const fs = require("fs")

const funcionFyh = () => {
    const dateTime = new Date().toLocaleString()
    try {
        fs.writeFileSync("./fyh.txt", dateTime)
        try {console.log(fs.readFileSync("./fyh.txt", "utf-8"))}
        catch(error) {console.log("Algo salió mal al leer el archivo => ", error.message)}
    }
    catch(error) {console.log("Algo falló al grabar el archivo => ", error.message)}
}


funcionFyh()