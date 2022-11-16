

process.on('message', (cant) => {
    const respuesta = generateRandom(cant)
    process.send(respuesta)
})


const generateRandom = (cant) => {
    let randomNumbers = []
    let numbersObject = {}
    console.log("cantidad: ", cant)
    for (var i=0; i <= cant; i++) {
        randomNumbers.push(Math.floor(Math.random()*1000+1))
    }

    console.log('randomnumbers: ', randomNumbers)

    for (const n of randomNumbers) {
        numbersObject[n]
            ? numbersObject[n]++
            : numbersObject[n] = 1

    }
    console.log("numbersobject: ", numbersObject)

    return numbersObject
}

// -El dato devuelto al frontend será un objeto que contendrá como claves los números random generados junto a la cantidad de veces que salió cada uno. Esta ruta no será bloqueante (utilizar el método fork de child process). Comprobar el no bloqueo con una cantidad de 500.000.000 de randoms.