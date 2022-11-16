
process.on('message', (msg)=>{
    if(msg === 'start') {
        const resultado = sumar()
        process.send(resultado)
    }
})


const sumar = () => {
    let suma = 0
    for (let i = 0; i<=6e9; i++) {
        suma+=1
    }
    return suma
}
