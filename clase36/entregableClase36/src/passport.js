const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const { createHash, compareHash, validateEmail } = require('./utils/utils.js')
const {UsersDAO} = require('./daos/daos.js')
const {Types} = require('mongoose');

// PASSPORT AUTHENTICATION CONFIGURATION


passport.use('login', new LocalStrategy( async (username, password, done) => {
    try {
        console.log(`line 12 . username: ${username}, password: ${password}`)
        const _user = await UsersDAO.getByFilter({username: username})
        console.log("line 14 . _user => ", _user)
        if (!_user || !(compareHash(password, _user.password))){
            console.log(`line 16 . No autenticado`)
            return done(null, false, {result: "Usuario o contraseña incorrectos"})
        }
        else {
            console.log("line 20 . Autenticado => ", _user)
            return done(null, _user)
        }
    }
    catch(error) {
        console.log(`line 25 . Error autenticando => ${error.message}`)
        return done(error)
    }    
}))



passport.serializeUser((user, done) => {
    done(null, user._id);
});
  
passport.deserializeUser(async (id, done) => {
    id = Types.ObjectId(id);
    const user = await UsersDAO.getById(id);
    done(null, user);
});
