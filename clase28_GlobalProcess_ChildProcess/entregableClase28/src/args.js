const yargs = require('yargs')
const args = yargs(process.argv.slice(2))
.alias({port: 'p'})
.default({port:8080})
.argv

args.otros = args._
delete args._
delete args.$0
console.log(args)

module.exports = {
    port: args.port,
    args
}