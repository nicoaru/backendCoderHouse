process.on('uncaughtException', error => console.log(error))
process.on('exit', code => console.log('código de salida: ', code))
// valida argumentos
function validateArgs(args, types) {
    if(args.length<1) {
        const error = {
            descripcion: 'entrada vacía'
        }
        process.exitCode = -4
        throw {error}
    }
    else {
        types.forEach(type => {
            if(type != 'number') {
                const error = {
                    descripcion: 'argumentos no válidos',
                    numeros: args,
                    tipos: argsTypes
                }
                process.exitCode = -5
                throw {error}
            }
        })
    }
}

// promedio
function promedio(numbersArray) {
    const sum = numbersArray.reduce((a,b) => Number(a)+Number(b), 0)
    console.log("sum: ", sum)
    return sum/numbersArray.length
}
// maximo
function max(numbersArray) {
    const _numbers = [...numbersArray]
    _numbers.sort((a,b) => a-b)
    return _numbers[0]
}
// minimo
function min(numbersArray) {
    const _numbers = [...numbersArray]
    _numbers.sort((a,b) => a-b)
    return _numbers[_numbers.length-1]
}

//

const args = process.argv.slice(2).map(arg => { 
    if(!isNaN(arg)) { return Number(arg) }
    else if(arg === 'true') { return true}
    else if(arg === 'false') {return false}
    else { return arg }
})

const argsTypes = args.map(arg => typeof(arg) )

validateArgs(args, argsTypes)


const datos = {
    numeros: args,
    types: argsTypes,
    promedio: promedio(args),
    max: max(args),
    min: min(args),
    ejecutable: process.execPath,
    pid: process.pid
}


console.log("datos: ", datos)