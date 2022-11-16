const yargs = require('yargs')
const args = yargs(process.argv.slice(2))
.alias({
    m:'mode',
    p:'port',
    d:'debug'
})
.default({
    m:'prod',
    p:0,
    d:false
})
.argv

args.otros = args._
delete args._
delete args.$0
delete args.m
delete args.p
delete args.d
console.log(process.argv)
console.log(args)