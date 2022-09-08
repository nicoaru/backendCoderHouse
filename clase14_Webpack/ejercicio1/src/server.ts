import express from "express"
import { Superficie } from "./lib/Superficie"
import { Perimetro } from "./lib/Perimetro"

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => console.log(`Servidor escuchando en puerto ${server.address().port}`)).on("error", (error) => console.log(`Error al conectar el servidor => ${error}`)) 


app.get("/", (req, res) => {
    const query = req.query
    switch (query.figura) {
        case "cuadrado":
            const lado:number = Number(query.lado)
            if (query.operacion === "perimetro"){
                res.json({...query, resultado: Perimetro.cuadrado(lado)})
            }
            else if (query.operacion === "superficie"){
                res.json({...query, resultado: Superficie.cuadrado(lado)})
            }
            break;
        case "rectangulo":
            const base:number = Number(query.base)
            const altura:number = Number(query.altura)
            if (query.operacion === "perimetro"){
                res.json({...query, resultado: Perimetro.rectangulo(base, altura)})            
            }
            else if (query.operacion === "superficie"){
                res.json({...query, resultado: Superficie.rectangulo(base, altura)})            
            }
            break;
        case "circulo":
            const radio:number = Number(query.radio)
            if (query.operacion === "perimetro"){
                res.json({...query, resultado: Perimetro.circulo(radio)})
            }
            else if (query.operacion === "superficie"){
                res.json({...query, resultado: Superficie.circulo(radio)})
            }
            break
    }
})