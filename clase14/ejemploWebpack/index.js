import { funcion1 } from "./functions.js"
import { funcion2 } from "./functions.js"
import Clase from "./clases.js"

const persona1 = new Clase("Juan Pérez", 25)

funcion1()
funcion2()

console.log(`${persona1.nombre} tiene ${persona1.edad} años`)