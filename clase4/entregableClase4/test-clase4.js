import Contenedor from "./claseContenedor-clase4.js";

// const {Contenedor} = require("Contenedor")

const productos = new Contenedor(productos.txt)


const objeto1 = {
    title: "Escuadra",
    price: 250, 
    thumbnail: "urlImg"
}

productos.save(objeto1)