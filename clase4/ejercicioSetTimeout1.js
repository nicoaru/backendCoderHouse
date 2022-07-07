
const fin = () => console.log("Terminé")

function mostrarLetras(string, delay, cb) {
    setTimeout(() => {
        let i = 0
        
        const mostrar = setInterval(() => {
            const index = i;
            console.log(string[index]);
            i++;
            if (i === string.length) {
                clearInterval(mostrar)
                cb() 
            }
        }, 1000)     
    }, delay)
}
    
mostrarLetras("Hola", 0, fin)
mostrarLetras("Hola", 250, fin)
mostrarLetras("Hola", 500, fin)