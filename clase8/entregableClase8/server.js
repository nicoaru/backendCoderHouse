const express = require("express")
const multer = require("multer")
const { Router } = express
const Contenedor = require("./Contenedor");


// server y router
const app = express()
const routerProductos = Router()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use("/api/productos", routerProductos)
const PORT = 8080
const server = app.listen(PORT, () => console.log(`Server escuchando en puerto ${server.address().port}`)).on("error", error => console.log(`Error conectando el servidor => ${error}`))

// instancia de Contenedor
const productos = new Contenedor("productos.txt")

// logica endpoints

app.get("/", (req, res) => {
    res.sendFile(__dirname+"/public/index.html")
})

routerProductos.get("/", (req, res, next) => {
    productos.getAll()
    .then(data => res.json(data))
    .catch(error => { 
        if(error.code === "ENOENT") { res.json([]) } 
        else {
            return next(error)
        }
    })
})

routerProductos.get("/:id", (req, res, next) => {
    const id = parseInt(req.params.id)
    productos.getById(id)
    .then(data => {
        let response
        if(data === null) {response = {error: "objeto no encontrado"}}
        else {response = data}
        res.json(response)
    })
    .catch(error => {
        if(error.code === "ENOENT") { res.json({error: "objeto no encontrado"}) } 
        else {
            return next(error)
        }

    })
})

routerProductos.post("/", (req, res, next) => {
    const obj = req.body
    productos.save(obj)
    .then(id => {
        res.json({id, ...obj})
    })
    .catch(error => next(error))
})

routerProductos.put("/:id", (req, res, next) => {
    const id = parseInt(req.params.id)
    const updatedProduct = {id, ...req.body}
    productos.updateById(updatedProduct, id)
    .then(data => res.json({mensaje: `El producto con id ${id} se actualizo correctamente`, producto: data}))
    .catch(error => res.json({error: error.message}))
})

routerProductos.delete("/:id", async (req, res, next) => {
    const id = parseInt(req.params.id)
    res.json(await productos.deleteById(id))
})
