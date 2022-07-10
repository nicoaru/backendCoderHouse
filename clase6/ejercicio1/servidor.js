const http = require("http")


const server = http.createServer((req, res) => {
    const horas = new Date().getHours()
    let saludo
    if(horas < 6) {saludo = "Buenas noches"}
    else if (6 <= horas && horas <= 12) { saludo = "Buenos dias"}
    else if (12 < horas && horas <= 19) {saludo = "Buenas tardes"}
    else if (horas > 19) {saludo = "Buenas noches"}

    res.end(`${saludo} son las ${horas} horas`)
})

server.listen(8081, () => console.log(`Servidor escuchando en puerto => `, server.address().port))