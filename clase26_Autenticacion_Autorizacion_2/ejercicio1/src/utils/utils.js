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


module.exports = { print, createHash, compareHash }