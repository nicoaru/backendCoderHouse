const { createHash, validateEmail } = require('../../utils/utils.js')
const { UsersRepository } = require('../../model/repositories/users.repository.js')
const { CarritosRepository } = require('../../model/repositories/carritos.repository.js')
const {sendMail} = require('../nodeMailer.js')
const {ADMIN_EMAIL} = require('../../config/config.js')





const createUser = async (ctx) => {
    console.log("Entró en POST /signup")
    try {
        let _user = await UsersRepository.getOneByFilter({$or: [{ username: ctx.request.body.username }, { email: ctx.request.body.email }]})
        console.log("body ", ctx.request.body)
        console.log("_user ", _user)

        if(!ctx.request.body.username || !ctx.request.body.email || !ctx.request.body.password || !validateEmail(ctx.request.body.email)) {
            const error = {error: true, message: 'Usuario, Email válido y Contraseña son obligatorios'}
            console.log(`failed signup => `, error.message)

            ctx.body = error
            ctx.status = 400
        }
        else if (_user) {
            let error
            _user.username === ctx.request.body.username
                ? error = {error: true, message: "Nombre de usuario ya existente"}
                : error = {error: true, message: "Email ingresado ya está en uso"}

            ctx.body = error
            ctx.status = 400
        }
        else {
            _newUser = {
                username: ctx.request.body.username, 
                name: ctx.request.body.name,
                password: createHash(ctx.request.body.password),
                email: ctx.request.body.email, 
                telephone: ctx.request.body.telephone, 
                address: ctx.request.body.address,
                imgurl: ctx.request.body.imgurl
            }
            const user = await UsersRepository.save(_newUser)
            console.log(`usuario creado => `, user)            
            if(user) {
                console.log(`usuario creado => `, user)            
                await CarritosRepository.save({userId: user._id})
                ctx.body = user
                ctx.status = 200            
            }
        }
    }
    catch(err) {
        console.log(`Error signup => `, err)
        const error = {error: 500, message: 'Internal server error'}
        ctx.body = error
        ctx.status = 500
    }
}

module.exports = { createUser }