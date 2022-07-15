const express = require("express")

const app = express()

const PORT = 8080
const server = app.listen(PORT, () => console.log(`Servidor escuchando en puerto ${server.address().port}`)).on("error", error => console.log(`Error en el servidor => ${error}`))

app.get("/api/sumar/:a/:b", (req, res) => {
    const a = parseInt(req.params.a)
    const b = parseInt(req.params.b)
    res.json({resultado: a+b})
})

app.get("/api/sumar", (req, res) => {
    const a = parseInt(req.query.num1)
    const b = parseInt(req.query.num2)
    res.json({resultado: a+b})
})

app.get("/api/operacion/:oper", (req, res) => {
    const params = req.params.oper.split("+")
    res.json({resultado: parseInt(params[0])+parseInt(params[1])})
})

app.post("/api", (req, res) => {
    res.json(`Ok post`)
})

app.put("/api", (req, res) => {
    const requestType = (Object.entries(req.route.methods)[0][0])
    res.json(`Ok put`)
})

app.delete("/api", (req, res) => {
    const requestType = (Object.entries(req.route.methods)[0][0])
    res.json(`Ok delete`)
})
