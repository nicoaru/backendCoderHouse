import { ContenedorFirebase } from "../../contenedores/contenedorFirebase.js";

class CarritosFirebase extends ContenedorFirebase {
  constructor(collection) {
    super(collection);
    this.connect();
    this.initFirestore();
    this.getCollectionRef();
}




  getAllCarritos(req, res) {
    this.getAll()
    .then(querySnapshot => {
        if (querySnapshot.empty) {
            res.json([])
        } 
        else {
            const _data = querySnapshot.docs.map(docSnapshot => {
                return {id: docSnapshot.id, ...docSnapshot.data()}
            })
            res.json(_data)   
        }
    })
    .catch(error => res.status(400).json(error.message))
  }

  saveCarrito(req, res) {
    this.save({productos:[]})
    .then(docRef => res.json({id: docRef.id}))
    .catch(error => res.status(400).json(error.message))
  }    
  
  getCarritoById(req, res) {
    let id = req.params.id
    const docRef = this.collectionRef.doc(id)
    this.getById(docRef)
    .then(docSnapshot => {
        if (docSnapshot.exists) {
            const _data = {id: docSnapshot.id, ...docSnapshot.data()}
            res.json(_data) 
        }
        else {
            const error = new Error('El carrito no existe más')
            res.status(400).json(error.message) 
        }
    })
    .catch(error => res.status(400).json({error: error.message}))
  } 

  updateCarritoById(req, res) {
    let id = req.params.id
    const docRef = this.collectionRef.doc(id)
    let newObject = req.body
       
    this.updateById(newObject, docRef)
    .then(data => {
        return this.getById(docRef)
    })
    .then (docSnapshot => {
        const _data = {id: docSnapshot.id, ...docSnapshot.data()}
        res.json(_data) 
    })
    .catch(error => res.status(400).json(error.message))            
  }

  deleteCarritoById(req, res) {
    let id = req.params.id
    const docRef = this.collectionRef.doc(id)
 
    try {
        this.deleteById(docRef)
        .then(data => res.json(`Documento ${docRef.id} eliminado con éxito`))
        .catch(error => res.status(400).json(error))                
    }
    catch (error) {
        res.status(400).json(error.message)
    }
  }



  deleteAllCarritos(req, res) {
    const deletedCarritos = []
    const failedDeletes = []
    this.collectionRef.listDocuments()
    .then(async docRefList => {
        try {
            for (let docRef of docRefList) (
                await this.deleteById(docRef)
                .then(res => {
                    console.log(`Carrito ${docRef.id} eliminado correctamente`)
                    deletedCarritos.push(docRef.id)
                })
                .catch(error => {
                    failedDeletes.push(docRef.id)
                    console.log(`Error al intentar borrar carrito ${docRef.id}`)
                })
            )
            res.json({deletedCarritos: deletedCarritos.length, failedDeletes})
        }
        catch(error) {
            res.status(400).json({error: error.message, deletedCarritos: deletedCarritos.length, failedDeletes})
        }
    })
    .catch(error => res.status(400).json(error.message))
}

////
  // devuelve todos los productos de un carrito
  getAllProductsInCart(req, res) {
    let id = req.params.id
    const docRef = this.collectionRef.doc(id)
    this.getById(docRef)
    .then(docSnapshot => {
        if (docSnapshot.exists) {
            const _productos = {...docSnapshot.data()}['productos']
            res.json(_productos) 
        }
        else {
            const error = new Error(`No existe carrito con id ${id}`)
            res.status(400).json(error.message) 
        }
    })
    .catch(error => res.status(400).json({error: error.message}))
  } 

  // agrega un producto a un carrito determinado
  addProductToCarrito(req, res) {
    let producto = req.body
    let id = req.params.id
    const docRef = this.collectionRef.doc(id)

    this.getById(docRef)
    .then(docSnapshot => {
      if (docSnapshot.exists) {
        const productos = {...docSnapshot.data()}['productos']
        productos.push(producto)
        return this.updateById({productos}, docRef)
      }
      else {
          const error = new Error(`No existe carrito con id ${id}`)
          res.status(400).json(error.message) 
      }
    })
    .then(() => {
      return this.getById(docRef)
    })
    .then (docSnapshot => {
        const _data = {id: docSnapshot.id, ...docSnapshot.data()}
        res.json(_data) 
    })
    .catch(error => res.status(400).json(error.message))
  }


  // elimina un producto determinado de un carrito
  deleteProductFromCarrito(req, res) {
    let producto = req.body
    let idCart = req.params.id
    const docRef = this.collectionRef.doc(idCart)
    let idProduct = req.params.id_prod

    this.getById(docRef)
    .then(docSnapshot => {
      if (docSnapshot.exists) {
        const productos = {...docSnapshot.data()}['productos']
        console.log("productos => ", productos)
        const productIndex = productos.indexOf(productos.find(obj => {if (obj.id === idProduct) {return obj}}));
        console.log("productIndex => ", productIndex)
        if (productIndex >= 0) {
          productos.splice(productIndex, 1)
          this.updateById({productos}, docRef)
          .then(() => {
            this.getById(docRef)
            .then (docSnapshot => {
              const _data = {id: docSnapshot.id, ...docSnapshot.data()}
              res.json(_data) 
            })
            .catch(error => res.status(400).json(error.message))
          })
          
        }
        else { 
          throw Error(`No hay producto con Id ${idProduct} en el carrito ${idCart}`)
        }
      }
      else {
          const error = new Error(`No existe carrito con id ${idCart}`)
          res.status(400).json(error.message) 
      }
    })
    .catch(error => res.status(400).json(error.message))
  }


}

export {CarritosFirebase}