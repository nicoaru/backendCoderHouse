const util = require('util')
const bcrypt = require('bcrypt')

const print = (objeto) => {
    console.log(util.inspect(objeto,false,12,true))
}

const createHash = (password) => {
    return bcrypt.hashSync(password, 10)
}

const compareHash = (password, hash) => {
    return bcrypt.compareSync(password, hash)
}

// validateEmail()
const validateEmail = (value) => {
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (value.match(validRegex)) { return true } 
    else { return false }
}


module.exports = { print, createHash, compareHash, validateEmail }