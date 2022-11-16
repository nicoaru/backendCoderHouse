const {ContenedorMongoDB} = require('../contenedores/contenedorMongoDB.js')
const mongoose = require("mongoose")
const Types = mongoose.Types

class CarritosDaoMongoDB extends ContenedorMongoDB {
  constructor(model) {
    super(model);
    this.connect()
  }

  getAllCarritos(req, res) {
    this.getAll()
    .then(data => res.json(data))
    .catch(error => res.status(400).json(error))
}

  saveCarrito(req, res) {
      this.save()
      .then(data => res.json(data))
      .catch(error => res.status(400).json(error))
  }

  getCarritoById(req, res) {
      let id = req.params.id
      id = Types.ObjectId(id)
      this.getById(id)
      .then(data => res.json(data))
      .catch(error => res.status(400).json(error))
  }

  updateCarritoById(req, res) {
      let id = req.params.id
      id = Types.ObjectId(id)
      let newObject = req.body
      this.updateById(newObject, id)
      .then(data => res.json(data))
      .catch(error => res.status(400).json(error))
  }

  deleteCarritoById(req, res) {
      let id = req.params.id
      id = Types.ObjectId(id)
      this.deleteById(id)
      .then(data => res.json(data))
      .catch(error => res.status(400).json(error))
  }

  deleteAllCarritos(req, res) {
      this.deleteAll()
      .then(data => res.json(data))
      .catch(error => res.status(400).json(error))
  }

  // devuelve todos los productos de un carrito
  getAllProductsInCart(req, res) {
    let cartId = req.params.id
    this.getById(cartId)
    .then(data => {
      let carrito = data
      let productos = carrito["productos"]
      res.json(productos)
    })
    .catch(error => res.status(400).json(error))
  }

  // agrega un producto a un carrito determinado
  addProductToCarrito(req, res) {
    let producto = req.body
    let cartId = req.params.id

    this.getById(cartId)
    .then(data => {
      console.log("data => ", data)
      let carrito = data
      if(carrito) {
        carrito["productos"].push(producto)
        return carrito.save()
      }
      else {
        throw new Error("El carrito no existe")
      }
      
    })
    .then(data => res.json(data))
    .catch(error => res.status(400).json(error.message))
  }

  // elimina un producto de un carrito determinado
  deleteProductFromCarrito(req, res) {
    let productId = req.params.id_prod
    let cartId = req.params.id
   
    this.getById(cartId)
    .then(data => {
      let carrito = data
      const productIndex = carrito["productos"].indexOf(carrito["productos"].find(obj => {if (obj._id === productId) {return obj}}));

      if (productIndex >= 0) {
        carrito["productos"].splice(productIndex, 1)
        return carrito.save()
      }
      else { 
        throw Error(`No hay producto con Id ${productId} en el carrito ${cartId}`)
      }
    })
    .then(data => res.json(data))
    .catch(error => res.status(400).json(error.message))
  }
}

module.exports = {CarritosDaoMongoDB}