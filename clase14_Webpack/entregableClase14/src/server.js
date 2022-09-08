const express = require("express")
const { Router } = express
const Contenedor = require("./utils/Contenedor");


// server y router
const app = express()
const routerProductos = Router()
const routerCarrito = Router()
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use("/api/productos", routerProductos)
app.use("/api/carrito", routerCarrito)
const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => console.log(`Server escuchando en puerto ${server.address().port}`)).on("error", error => console.log(`Error conectando el servidor => ${error}`))

// admin
let admin = true

// instancias de Contenedor
const productos = new Contenedor("productos.txt")
const carritos = new Contenedor("carritos.txt")

// middlewares
const isAdmin = (req, res, next) => {
    if (!admin) {
        error = new Error(`No tiene autorización de Admin`)
        res.json({error: -1, descripcion:`Ruta ${req.baseUrl}${req.url}, método ${req.method}, no autorizado`})
    }
    else {
        next()
    }
}

app.get("/", (req, res) => {
    res.sendFile("index.html")
})

// API/PRODUCTOS
// devuelve todos los productos(array), un array vacío o mensaje de error
routerProductos.get("/", (req, res) => {
    productos.getAll()
    .then(data => res.json(data))
    .catch(error => { 
        console.log(error.message)
        if(error.code === "ENOENT") { res.json([]) } 
        else {
            res.json({error: `Hubo un inconveniente procesando la solicitud: ${error.message}`})
        }
    })
})

// devuelve el producto(objeto), null o mensaje de error
routerProductos.get("/:id", (req, res) => {
    const id = parseInt(req.params.id)
    productos.getById(id)
    .then(item => {
        console.log(item)
        res.json(item) 
    })
    .catch(error => {
        console.log(error.message)
        if(error.code === "ENOENT") { res.json(null) } 
        else {
            res.json({error: `Hubo un inconveniente procesando la solicitud: ${error.message}`})
        }

    })
})

// carga el producto. devuelve el id asignado o mensaje de error
routerProductos.post("/", isAdmin,  (req, res) => {
    const obj = req.body
    productos.save(obj)
    .then(id => {
        res.json(id)
    })
    .catch(error => {
        console.log(error.message)
        res.json({error: `Hubo un inconveniente procesando la solicitud: ${error.message}`})
    })
})

// actualiza el producto indicado. Devuelve mensaje de confirmacion junto con el producto, o mensaje de error
routerProductos.put("/:id",isAdmin, (req, res) => {
    const id = parseInt(req.params.id)
    const updatedProduct = {...req.body}
    productos.updateById(updatedProduct, id)
    .then(data => res.json({mensaje: `El producto con id ${id} se actualizo correctamente`, producto: data}))
    .catch(error => {
        console.log(error.message)    
        res.json({error: `Hubo un inconveniente procesando la solicitud: ${error.message}`})
    })
})

// elimina un producto. Devuelve mensaje deconfirmación o mensaje de error
routerProductos.delete("/:id", isAdmin, async (req, res) => {
    const id = parseInt(req.params.id)
    res.json(await productos.deleteById(id))
})


// API/CARRITO
// crea un carrito nuevo. devuelve el id asignado o mensaje de error
routerCarrito.post("/", (req, res) => {
    const {userId} = req.body
    carritos.save({userId, productos:[]})
    .then(id => {
        res.json(id)
    })
    .catch(error => {
        console.log(error.message)
        res.json({error: `Hubo un inconveniente procesando la solicitud: ${error.message}`})
    })
})

// elimina un carrito. Devuelve mensaje de confirmación o mensaje de error
routerCarrito.delete("/:id", async (req, res) => {
    const idCarrito = parseInt(req.params.id)
    res.json(await carritos.deleteById(idCarrito))
})

// devuelve todos los productos agregados a un carrito(array), un array vacío o mensaje de error
routerCarrito.get("/:id/productos", (req, res) => {
    const idCarrito = parseInt(req.params.id)
    console.log(idCarrito)
    carritos.getById(idCarrito)
    .then(item => {
        console.log(item)
        if (item) {res.json(item.productos)} 
        else {throw Error(`No existe el carrito con id ${idCarrito}`)}
    })
    .catch(error => {
        console.log(error)
        if(error.code === "ENOENT") { res.json({error: `No existe el carrito: ${error.message}`}) } 
        else {
            res.json({error: `Hubo un inconveniente procesando la solicitud: ${error.message}`})
        }
    })
})

// agrega un producto al carrito indicado. Devuelve mensaje de confirmacion junto con la lista de productos del carrito, o mensaje de error
routerCarrito.post("/:id/productos", (req, res) => {
    const idCarrito = parseInt(req.params.id)
    const product = {...req.body}

    carritos.addToItemArray(product, idCarrito, "productos")
    .then( data => {
        res.json(data)
    })
    .catch(error => {
        console.log(error.message)
        if(error.code === "ENOENT") { res.json({error: `No existe carrito con id ${idCarrito}: ${error.message}`}) } 
        else {
            res.json({error: `Hubo un inconveniente procesando la solicitud: ${error.message}`})
        }
    })
})

// elimina un producto del carrito indicado. Devuelve mensaje de confirmacion junto con la lista de productos del carrito, o mensaje de error
routerCarrito.delete("/:id/productos/:id_prod", (req, res) => {
    const idCarrito = parseInt(req.params.id)
    const idProd = parseInt(req.params.id_prod)
    
    carritos.deleteFromItemArray(idProd, idCarrito, "productos")
    .then(data => res.json(data))
    .catch(error => {
        console.log(error.message)
        if(error.code === "ENOENT") { res.json({error: `No existe el carrito: ${error.message}`}) } 
        else {
            res.json({error: `Hubo un inconveniente procesando la solicitud: ${error.message}`})
        }
    })
})




// ruta no existente
app.use(function(req, res, next) {
    res.json({error: -2, descripcion: `Ruta ${req.baseUrl}${req.url}, método ${req.method}, no existe`});
    next();
   });