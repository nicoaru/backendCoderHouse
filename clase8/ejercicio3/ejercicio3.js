const express = require("express")
const {Router} = express
const multer =require("multer")

// creo el server
const app = express()
// lo configuro
app.use(express.json())
app.use(express.urlencoded({extended: true}))
// app.use(express.static(__dirname+"/public"))
// middlewares

// routers
const routerPersonas = Router()
app.use("/personas", routerPersonas)
const routerMascotas = Router()
app.use("/mascotas", routerMascotas)
// conecto el server al puerto 8080
const PORT = 8080
const server = app.listen(8080, () => console.log(`Servidor escuchando en puerto ${server.address().port}`)).on("error", error => console.log(`Error en servidor => ${error}`))
// multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./files/uploads")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname)
    }
})
const upload = multer({storage: storage})


// lógica de endpoints

    // raíz
app.get("/", (req, res) => {res.sendFile(__dirname+"/public/index.html")})

    // upload single file => utiliza el middleware upload.single()
app.post("/uploadFile", upload.single("unArchivo"), (req, res, next) => {
    const file = req.file
    console.log("file => ", file)
    if(!file) {
        const error = new Error("Por favor selecciona un archivo")
        error.httpStatusCode = 400
        return next(error)
    }
    res.sendFile(__dirname + "/" + file.path)
})

    // upload multiple files => utiliza el middleware upload.array()
app.post("/uploadMultiple", upload.array("variosArchivos", 5), (req, res, next) => {
    const files = req.files
    console.log("files => ", files)
    if(!files) {
        const error = new Error("Por favor selecciona un archivo")
        error.httpStatusCode = 400
        return next(error)
    }
    res.json(files)
})