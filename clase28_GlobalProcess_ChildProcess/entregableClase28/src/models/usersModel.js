const {Schema, model} = require('mongoose')

const UserSchema = new Schema({
    username: {type: String},
    password: {type: String},
    email: {type: String},
    telephone: {type: String},
    avatar: {type: String}
});
  


const Users = model('users', UserSchema);


module.exports =  {Users, UserSchema}