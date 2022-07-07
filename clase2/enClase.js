function foo() {
    return function() {
        console.log("Buen día, buen día")
    }
}

// a una variable puedo asignarle:
//una funcion
const f = foo
//el valor que retorna la funcion
const f = foo()
//y la variable puede ser llamada invocando la funcion  
f()
//o no
f

// ojota que el doble llamado llama a la funcion, y a la función que retorna
foo()()

//backtick es multilinea