const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const { createHash, compareHash, validateEmail } = require('../utils/utils.js')
const { UsersRepository } = require('../model/repositories/users.repository.js')
const {Types} = require('mongoose');


// PASSPORT AUTHENTICATION CONFIGURATION

passport.use('login', new LocalStrategy( async (username, password, done) => {
    console.log("Entró en passport login")
    try {
        console.log(`line 13 . username: ${username}, password: ${password}`)
        const _user = await UsersRepository.getOneByFilter({username: username})
        console.log("line 15 . _user => ", _user)
        if (!_user || !(compareHash(password, _user.password))){
            console.log(`line 16 . No autenticado`)
            // passport responde con status 401 (unauthorized)
            return done(null, false, {error: true, message: "Usuario o contraseña incorrectos"})
        }
        else {
            console.log("line 22 . Autenticado => ", _user)
            return done(null, _user)
        }
    }
    catch(error) {
        console.log(`line 27 . Error autenticando => ${error.message}`)
        return done(error)
    }    
}))



passport.serializeUser((user, done) => {
    done(null, user._id);
});
  
passport.deserializeUser(async (id, done) => {
    id = Types.ObjectId(id);
    const user = await UsersRepository.getById(id);
    done(null, user);
});
