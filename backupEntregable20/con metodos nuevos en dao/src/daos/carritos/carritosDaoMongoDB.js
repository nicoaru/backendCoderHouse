import {ContenedorMongoDB} from '../../contenedores/contenedorMongoDB.js';
import mongoose from "mongoose";
const Types = mongoose.Types

class CarritosDaoMongoDB extends ContenedorMongoDB {
  constructor(model) {
    super(model);
  }

  getAllCarritos(req, res) {
    this.getAll()
    .then(data => res.json(data))
    .catch(error => res.status(400).json(error))
}

  saveCarrito(req, res) {
      let producto = req.body
      this.save(producto)
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

  // devuelve todos los productos de una carrito
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
      let carrito = data
      carrito["productos"].push(producto)
      return carrito.save()
    })
    .then(data => res.json(data))
    .catch(error => res.status(400).json(error))
  }

  // elimina un producto de un carrito determinado
  deleteProductFromCarrito(req, res) {
    let productId = req.paramas.id_prod
    let cartId = req.params.id
   
    this.getById(cartId)
    .then(data => {
      let carrito = data
      const productIndex = carrito["productos"].indexOf(carrito["productos"].find(obj => {if (obj.id === productId) {return obj}}));

      if (productIndex >= 0) {
        carrito["productos"].splice(productIndex, 1)
        return carrito.save()
      }
      else { 
        throw Error(`No hay producto con Id ${productId} en el carrito ${cartId}`)
      }
    })
    .then(data => res.json(data))
    .catch(error => res.status(400).json(error))
  }
}

export {CarritosDaoMongoDB}







  // // agrega un producto de un carrito determinado
  // addProductToCarrito(product, cartId) {
  //   const model = this.model;
  //   return new Promise((resolve, reject) => {
        
  //     model.findOne({_id: cartId})
  //     .then(res => {
  //         let _object = res
  //         _object["productos"].push(product)
  //         return _object.save()
  //     })
  //     .then(res => resolve(res))
  //     .catch(error => reject(error))                      
  //   })
  // }

  // // elimina un producto de un carrito determinado
  // deleteProductFromCarrito(productId, cartId) {
  //   const model = this.model;
  //   return new Promise((resolve, reject) => {
          
  //     model.findOne({_id: cartId})
  //     .then(res => {
  //       let _object = res
  //       const productIndex = _object["productos"].indexOf(_object["productos"].find(obj => {if (obj.id === productId) {return obj}}));
        
  //       if (productIndex >= 0) {
  //         _object["productos"].splice(productIndex, 1)
  //         return _object.save()
  //       }
  //       else { 
  //         reject(Error(`No hay producto con Id ${productId} en el carrito ${cartId}`))
  //       }
  //     })
  //     .then(res => resolve(res))
  //     .catch(error => reject(error))                      
  //   })
  // }