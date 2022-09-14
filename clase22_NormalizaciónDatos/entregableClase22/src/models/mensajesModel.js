const {Schema, model} = require('mongoose')

const MensajeSchema = new Schema({
    author: {
        email: {type: String, required: true, default:''},
        nombre: {type: String, required: true, default:''},
        apellido: {type: String, required: true, default:''},
        edad: {type: String, required: true, default:''},
        alias: {type: String, required: true, default:''},
        avatar: {type: String, required: true, default:''},
    },
    text: {type: String, required: true, default:''}
}, {timestamps: true});
  


const MensajesModel = model('mensajes', MensajeSchema);


module.exports =  {MensajesModel, MensajeSchema}