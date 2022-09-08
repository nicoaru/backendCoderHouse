import {ContenedorMongoDB} from '../../contenedores/contenedorMongoDB.js';
import mongoose from "mongoose";
const Types = mongoose.Types
import { Producto } from "../../models/productosModel.js";


class ProductosDaoMongoDB extends ContenedorMongoDB {
    
    constructor(model) {
      super(model);
    }

    // getAllProductos(req, res) {
    //     this.getAll()
    //     .then(data => res.json(data))
    //     .catch(error => res.status(400).json(error))
    // }

    getAllProductos() {
        this.getAll()
        .then(data => console.log("getAllProducts => ", data))
        .catch(error => console.log("getAllProducts error => ", error))
    }

    saveProducto(req, res) {
        let producto = req.body
        this.save(producto)
        .then(data => res.json(data))
        .catch(error => res.status(400).json(error))
    }

    getProductoById(req, res) {
        let id = req.params.id
        id = Types.ObjectId(id)
        this.getById(id)
        .then(data => res.json(data))
        .catch(error => res.status(400).json(error))
    }

    updateProductoById(req, res) {
        let id = req.params.id
        id = Types.ObjectId(id)
        let newObject = req.body
        this.updateById(newObject, id)
        .then(data => res.json(data))
        .catch(error => res.status(400).json(error))
    }

    deleteProductoById(req, res) {
        let id = req.params.id
        id = Types.ObjectId(id)
        this.deleteById(id)
        .then(data => res.json(data))
        .catch(error => res.status(400).json(error))
    }

    deleteAllProductos(req, res) {
        this.deleteAll()
        .then(data => res.json(data))
        .catch(error => res.status(400).json(error))
    }

}




export { ProductosDaoMongoDB}