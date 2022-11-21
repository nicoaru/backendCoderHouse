const {ContenedorMongoDB} = require('../contenedores/contenedorMongoDB.js')
const mongoose = require("mongoose")
const Types = mongoose.Types



class PedidosDaoMongoDB extends ContenedorMongoDB {
    
    constructor(model) {
      super(model)
    }

    getPedidoById(req, res) {
        let id = req.params.id
        try{
            id = Types.ObjectId(id)
            this.getById(id)
            .then(data => res.json(data))
            .catch(error => res.status(400).json(error.message))
        }
        catch(error){
            res.status(400).json(error.message) 
        }


    }

    updatePedidoById(req, res) {
        let id = req.params.id
        let newObject = req.body
        
        try{
            id = Types.ObjectId(id)            
            this.updateById(newObject, id)
            .then(data => res.json(data))
            .catch(error => res.status(400).json(error.message))            
        }
        catch(error){
            res.status(400).json(error.message) 
        }


    }

    deletePedidoById(req, res) {
        let id = req.params.id
     
        try {
            id = Types.ObjectId(id)
            this.deleteById(id)
            .then(data => res.json(data))
            .catch(error => res.status(400).json(error))                
        }
        catch (error) {
            res.status(400).json(error.message)
        }
    }

}

module.exports = {PedidosDaoMongoDB}