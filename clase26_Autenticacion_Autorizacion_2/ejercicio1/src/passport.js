const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const { createHash, compareHash } = require('./utils/utils.js')


passport.use('login', new LocalStrategy( async (username, password, done) => {
    try {
        const _user = await Users.findOne({username: username})

        if(!_user || !(compareHash(password, _user.password))){
            return done(null, false, {result: "Usuario o contraseña incorrectos"})
        }
        else {
            delete _user.password
            return done(null, _user)
        }
    }
    catch(error) {
        return done(error, false)
    }    
}))

passport.use('signup', new LocalStrategy({passReqToCallback: true}, async (req, username, password, done) => {
    try {
        let _user = await Users.findOne({username: username})
        if(_user) {
            return done(null, false, {result: 'Nombre de usuario ya existente'})
        }
        else {
            _user = new Users({
                username: req.body.username, 
                password: createHash(req.body.password),
                email: req.body.email, 
                telephone: req.body.telephone
            })
            _user = await _user.save()
            delete _user.password
            return done(null, _user)
        }
    }
    catch(error) {
        return done(error, false)
    }
}))




