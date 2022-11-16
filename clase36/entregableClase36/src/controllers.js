const { createHash, validateEmail } = require('./utils/utils.js')
const {UsersDAO} = require('./daos/daos.js')

const getSignup = async (req, res) => {
    try {
        let _user = await UsersDAO.getByFilter({$or: [{ usename: req.body.username }, { email: req.body.email }]})
        // console.log(`line 127 . _user => `, _user)


        if(!req.body.username || !req.body.email || !req.body.password || !validateEmail(req.body.email)) {
            console.log(`line 122 . failed signp => `, 'Usuario, Email válido y Contraseña son obligatorios')
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
                password: createHash(req.body.password),
                email: req.body.email, 
                telephone: req.body.telephone, 
                avatar: req.body.avatar
            }
            UsersDAO.save(_newUser)
            .then(user => {
                console.log(`line 139 . usuario creado => `, user)
                res.status(200).json(user)
            })
            .catch(error => {
                console.log('line 143 . error _newUser.save( )=> ', error)
                throw error
            })
        }
    }
    catch(error) {
        console.log(`line 149 . Error signup => `, error)
        res.status(500).json({error: 500, message: 'Internal server error'})
    }
}

module.exports = { getSignup }