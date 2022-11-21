const { createHash, validateEmail } = require('./utils/utils.js')
const {UsersDAO} = require('./daos/daos.js')
const {CarritosDAO} = require('./daos/daos.js')
const {sendMail} = require('./nodeMailer')

const postSignup = async (req, res) => {
    console.log("Entró en POST /signup")
    try {
        let _user = await UsersDAO.getOneByFilter({$or: [{ username: req.body.username }, { email: req.body.email }]})
        console.log("body ", req.body)
        console.log("_user ", _user)

        if(!req.body.username || !req.body.email || !req.body.password || !validateEmail(req.body.email)) {
            console.log(`failed signup => `, 'Usuario, Email válido y Contraseña son obligatorios')
           res.status(400).json({error: true, message: 'Usuario, Email válido y Contraseña son obligatorios'})
        }
        else if (_user) {
            let resp
            _user.username === req.body.username
                ? resp = {error: true, message: "Nombre de usuario ya existente"}
                : resp = {error: true, message: "Email ingresado ya está en uso"}

            res.status(400).json(resp)
        }
        else {
            _newUser = {
                username: req.body.username, 
                name: req.body.name,
                password: createHash(req.body.password),
                email: req.body.email, 
                telephone: req.body.telephone, 
                address: req.body.address,
                imgurl: req.body.imgurl
            }
            UsersDAO.save(_newUser)
            .then(async user => {
                console.log(`usuario creado => `, user)
                CarritosDAO.save({userId: user._id})


                const emailSubject = "Nuevo resgitro"
                const emailHtmlBody = `<h3>Nombre: ${user.name}</h3>
                                        <h3>Usuario: ${user.username}</h3>
                                        <h3>Email: ${user.email}</h3>
                                        <h3>Teléfono: ${user.telephone}</h3>
                                        <h3>Dirección: ${user.address}</h3>
                                        <h3>Avatar: <img src="${user.imgurl}" alt="imagen de usuario" width="100px"/> </h3>`
                const adminEmailResult = await sendMail(emailSubject, emailHtmlBody)
                console.log("Signup admin notification result ", adminEmailResult)
                res.status(200).json(user)
            })
            .catch(error => {
                console.log('error _newUser.save( )=> ', error)
                throw error
            })
        }
    }
    catch(error) {
        console.log(`Error signup => `, error)
        res.status(500).json({error: 500, message: 'Internal server error'})
    }
}

module.exports = { postSignup }