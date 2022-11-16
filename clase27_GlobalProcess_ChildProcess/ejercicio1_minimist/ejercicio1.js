console.log(process.argv)

const parseArgs = require('minimist')
const options = {default: {p: 0, m: 'prod', d: false}, alias: {p:'PORT', m:'mode', d:'debug'}}
const args = parseArgs(process.argv.slice(2), options)
args.otros = args._
delete args._
delete args.p
delete args.m
delete args.d
console.log(args)
