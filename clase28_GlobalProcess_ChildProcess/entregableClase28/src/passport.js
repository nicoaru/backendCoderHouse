const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const { createHash, compareHash, validateEmail } = require('./utils/utils.js')
const {Users} = require('./models/usersModel.js')
const {Types} = require('mongoose');

// PASSPORT AUTHENTICATION CONFIGURATION


passport.use('login', new LocalStrategy( async (username, password, done) => {
    try {
        console.log(`line 24 . username: ${username}, password: ${password}`)
        const _user = await Users.findOne({username: username})
        console.log("line 26 . _user => ", _user)
        if (!_user || !(compareHash(password, _user.password))){
            console.log(`line 29 . No autenticado`)
            return done(null, false, {result: "Usuario o contraseña incorrectos"})
        }
        else {
            console.log("line 34 . Autenticado => ", _user)
            return done(null, _user)
        }
    }
    catch(error) {
        console.log(`line 39 . Error autenticando => ${error.message}`)
        return done(error)
    }    
}))



passport.serializeUser((user, done) => {
    done(null, user._id);
});
  
passport.deserializeUser(async (id, done) => {
    id = Types.ObjectId(id);
    const user = await Users.findById(id);
    done(null, user);
});
