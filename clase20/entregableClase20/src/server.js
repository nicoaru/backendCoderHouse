import express from "express";
import { routerProductos } from "./routes/routeProductos.js";
import { routerCarritos } from "./routes/routeCarritos.js";
// import { connectToMongoDB } from "./dbConnections.js";


// server y router
const app = express()
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use("/api/productos", routerProductos)
app.use("/api/carritos", routerCarritos)
const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => console.log(`Server escuchando en puerto ${server.address().port}`)).on("error", error => console.log(`Error conectando el servidor => ${error}`))

// connectToMongoDB()

// ruta index
app.get("/", (req, res) => {
    res.sendFile("index.html")
})

// ruta no existente
app.use(function(req, res, next) {
    res.json({error: -2, descripcion: `Ruta ${req.baseUrl}${req.url}, método ${req.method}, no existe`});
    next();
});

