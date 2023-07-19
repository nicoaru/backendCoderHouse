const {Schema, model} = require('mongoose')

const MensajeSchema = new Schema({
    author: {
        email: {type: String, required: false, default:''},
        nombre: {type: String, required: false, default:''},
        apellido: {type: String, required: false, default:''},
        edad: {type: String, required: false, default:''},
        alias: {type: String, required: false, default:''},
        avatar: {type: String, required: false, default:''},
    },
    text: {type: String, required: true, default:''}
}, {timestamps: true});
  


const MensajesModel = model('mensajes', MensajeSchema);


module.exports =  {MensajesModel, MensajeSchema}