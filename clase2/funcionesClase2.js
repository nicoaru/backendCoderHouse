function mostrarLista(lista) {
    lista.length === 0 ?
    console.log("lista vacia") :
    lista.forEach(element => console.log(element))
};


mostrarLista(["caca", "pis", "moco"]);

/* */

(function(numeros) {
    numeros.length === 0 ?
    console.log("lista vacia") :
    numeros.forEach(element => console.log(element))
})([1,2,3]);

/* */

function creaMultiplicador(number1, functionName) {

    return function(number2) { console.log(`resultado ${functionName} => `, (number1 * number2))}
}

const duplicar = creaMultiplicador(2, "duplicar")
const triplicar = creaMultiplicador(3, "triplicar")

duplicar(5)
triplicar(5)
duplicar(20)
triplicar(20)
duplicar(25)
triplicar(25)