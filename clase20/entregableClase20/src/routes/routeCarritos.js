import { dbType } from "../config.js";
import * as DAOs from "../daos/daos.js";
import { Router } from "express"
const routerCarritos = Router()

// defino cual DAO importo, segun la base de datos configurada en config.js
let Carritos
switch (dbType) {
    case "MongoDB":
        Carritos = DAOs.CarritosMongoDB
        break;
    case "Firebase":
        Carritos = DAOs.CarritosFirebase
        break;
    default:
        break;
}


// crea un carrito nuevo
routerCarritos.post("/", (req, res) => {Carritos.saveCarrito(req, res)} )

// elimina un carrito
routerCarritos.delete("/:id", (req, res) => {Carritos.deleteCarritoById(req, res)} )

// devuelve todos los productos agregados a un carrito(array)
routerCarritos.get("/:id/productos", (req, res) => {Carritos.getAllProductsInCart(req, res)} )

// agrega un producto al carrito indicado
routerCarritos.post("/:id/productos", (req, res) => {Carritos.addProductToCarrito(req, res)} )

// elimina un producto del carrito indicado
routerCarritos.delete("/:id/productos/:id_prod", (req, res) => {Carritos.deleteProductFromCarrito(req, res)} )




export {routerCarritos}