const { createHash, validateEmail } = require('../../utils/utils.js')
const { UsersRepository } = require('../../model/repositories/users.repository.js')
const { CarritosRepository } = require('../../model/repositories/carritos.repository.js')
const {sendMail} = require('../nodeMailer.js')
const {ADMIN_EMAIL} = require('../../config/config.js')





const createUser = async ({input}) => {
    console.log("Entró a create user")
    try {
        let _user = await UsersRepository.getOneByFilter({$or: [{ username: input.username }, { email: input.email }]})
        console.log("input => ", input)
        console.log("_user ", _user)

        if(!input.username || !input.email || !input.password || !validateEmail(input.email)) {
            console.log(`failed signup => `, 'Usuario, Email válido y Contraseña son obligatorios')
            return {error: true, message: 'Usuario, Email válido y Contraseña son obligatorios'}
        }
        else if (_user) {
            let resp
            _user.username === input.username
                ? resp = {error: true, message: "Nombre de usuario ya existente"}
                : resp = {error: true, message: "Email ingresado ya está en uso"}

            return resp
        }
        else {
            _newUser = {
                username: input.username, 
                name: input.name,
                password: createHash(input.password),
                email: input.email, 
                telephone: input.telephone, 
                address: input.address,
                imgurl: input.imgurl
            }
            
            try {
                const user = await UsersRepository.save(_newUser)
                console.log(`usuario creado => `, user)
                await CarritosRepository.save({userId: user._id})
                return user             
            }
            catch(err) {
                console.log('error _newUser.save( )=> ', err)
                const error = {error: true, message: err.message}
                return error           
            }
        }
    }
    catch(error) {
        console.log(`Error signup => `, error)
        return {error: 500, message: 'Internal server error'}
    }
}

module.exports = { createUser }