//- setTimeout y setInnterval recibe 2 parametros obligatorios, y otros opcionales:
//-     . función a ejecutar
//-     . tiempo a esperar antes de ejecutarla 
//-     . params extra que seran pasados como parametros a la funcion a ejecutar
//- ambos retornan un objeto que es el Id de ese setInterval, y se usa para pasar como parametro a clearTimeout() y clearInterval(), a fin de cancelar el setTimeout antes de que ejecute la función o para finalizar la ejecucion repetitiva de la función en clearInterval()

function hacerTarea(num, cb) {
    console.log('haciendo tarea ' + num)
    setTimeout(cb,100)
}

console.log('inicio de tareas');

hacerTarea(1, () => {
    hacerTarea(2, () => {
        hacerTarea(3, () => {
            hacerTarea(4, () => {
                console.log('fin de tareas')
            })
        })
    })
})
console.log('otras tareas ...')