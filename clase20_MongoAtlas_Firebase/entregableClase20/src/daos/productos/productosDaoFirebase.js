import { ContenedorFirebase } from "../../contenedores/contenedorFirebase.js";


class ProductosDaoFirebase extends ContenedorFirebase {
    
    constructor(collection) {
        super(collection);
        this.connect();
        this.initFirestore();
        this.getCollectionRef();
    }

    getAllProductos(req, res) {
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

    saveProducto(req, res) {
        let producto = req.body
        this.save(producto)
        .then(docRef => res.json({id: docRef.id}))
        .catch(error => res.status(400).json(error.message))
    }

    getProductoById(req, res) {
        let id = req.params.id
        console.log("id => ", id)
        const docRef = this.collectionRef.doc(id)
        console.log("docRef => ", docRef)
        this.getById(docRef)
        .then(docSnapshot => {
            if (docSnapshot.exists) {
                const _data = {id: docSnapshot.id, ...docSnapshot.data()}
                res.json(_data) 
            }
            else {
                const error = new Error(`No existe producto con id ${id}`)
                res.status(400).json(error.message) 
            }
        })
        .catch(error => res.status(400).json({error: error.message}))
    }

    updateProductoById(req, res) {
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

    deleteProductoById(req, res) {
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

    deleteAllProductos(req, res) {
        const deletedProducts = []
        const failedDeletes = []
        this.collectionRef.listDocuments()
        .then(async docRefList => {
            try {
                for (let docRef of docRefList) (
                    await this.deleteById(docRef)
                    .then(res => {
                        console.log(`Doc ${docRef.id} eliminado correctamente`)
                        deletedProducts.push(docRef.id)
                    })
                    .catch(error => {
                        failedDeletes.push(docRef.id)
                        console.log(`Error al intentar borrar doc ${docRef.id}`)
                    })
                )
                res.json({deletedProducts: deletedProducts.length, failedDeletes})
            }
            catch(error) {
                res.status(400).json({error: error.message, deletedProducts: deletedProducts.length, failedDeletes})
            }
        })
        .catch(error => res.status(400).json(error.message))
    }
}

export { ProductosDaoFirebase }