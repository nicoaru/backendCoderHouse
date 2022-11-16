const yargs = require('yargs')
const args = yargs(process.argv.slice(2))
.alias({port: 'p', mode: 'm'})
.default({port:8080, mode: 'FORK'})
.argv

args.otros = args._
delete args._
delete args.$0
console.log(args)
const port = args.port
const serverMode = args.mode

// const args = process.argv.splice(2)
// const serverMode = args[1]
// const port = args[0] || 8080

module.exports = {
    serverMode,
    port,
    args
}