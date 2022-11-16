const { createHash, validateEmail } = require('./utils/utils.js')
const {Users} = require('./models/usersModel.js')


const getSignup = async (req, res) => {
    try {
        let _user = await Users.findOne({username: req.body.username})
        // console.log(`line 127 . _user => `, _user)
        if(!req.body.username || !req.body.email || !req.body.password || !validateEmail(req.body.email)) {
            console.log(`line 122 . failed signp => `, 'Usuario, Email válido y Contraseña son obligatorios')
           res.status(400).json({error: true, message: 'Usuario, Email válido y Contraseña son obligatorios'})
        }
        else if (_user) {
            console.log(`line 126 . failed signup => `, 'Nombre de usuario ya existente')
            // res.status(400).send('Nombre de usuario ya existente')
            res.status(400).json({error: true, message: 'Nombre de usuario ya existente'})
        }
        else {
            _newUser = new Users({
                username: req.body.username, 
                password: createHash(req.body.password),
                email: req.body.email, 
                telephone: req.body.telephone, 
                avatar: req.body.avatar
            })
            _newUser.save()
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