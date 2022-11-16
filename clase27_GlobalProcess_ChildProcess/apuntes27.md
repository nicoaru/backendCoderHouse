Process
    . el objeto 'process' es una variable global disponible en NodeJS. Al ser un objeto global quiere decir que puede usarse en cualquier parte del código, sin necesidad de hacer el require()
    . ofrece diversas informaciones y utilidades acerca del proceso que está ejecutando un script Node 
    . Contiene métodos, eventos y propiedades que permiten obtener datos del proceso actual y también controlarlo
    . ejmmplos:
        process.argv
        process.env
        

Argumentos en Node
    . se pasan por linea de comandos en formato string 
    . para acceder a los argumentos que le pasamos lo hacemos a traves del objeto global "process.argv" dentro del .js
    . process.argv devuelve un array: 
        . index 0: path al runtime (en nuestro caso Node) 
        . index 1: path al .js que se ejecuta 
        . luego: los argumentos propiamente dichos pasados por CLI    

Minimist
    . Nos permite analizar un array de strings (usualmente obtenido de los argumentos ingresados por línea de comando) y lo transformará en un objeto más fácil de usar, ya que nos permite acceder acceder a los elementos mediante su nombre
    . npm i minimist
    . const parseArgs = require('minimist')
      const args parseArgs(process.argv.splice(2), {...options})
    . args._ contiene un array con los argumentos que no tienen una opción asociada con ellos, o todos los argumentos que se     encuentran sueltos o no se encuentran precedidos por un argumento guinado
    . --arg crea una propiedad con ese nombre, cuyo valor será el siguiente argumento
    . -a crea una propiedad con esa letra como nombre (sólo puede ser usado con letras, no palabras)
    . Si luego de un argumento guionado (- o --) no se encuentra ningún otro argumento, o el argumento siguiente también es guionado, el primero se interpreta como un valor booleano con valor true.
    . en el objeto options podemos:
        . definir valores por defecto para ciertas propiedades, si no reciben un valor por parámetro
        . definir un alias para una propiedad recibida por parámetro. No elimina la propiedad original, sino que crea una nueva con el alias definido y el valor de la original. Y si recibe por parámetro el alias, también quedan los dos
        . options = {
            default: {PORT: 8080, mode: 'dev'},
            alias: {name: 'nombre_de_usuario}
          }
        . y un par de cosas más, ver documentación
Yargs
    . npm i yargs
    . const yargs = require('yargs')
      const args = yargs(process.argv.splice(2)).argv
    . se maneja con metodos, muy sencillo
    . ver documentacion



Variables de entorno
    . accedemos a ellas a través del objeto global "process.env" -> process.env.nombreVariable
    . son variables externas a nuestra aplicación 
    . residen en el sistema operativo o en el contenedor de la aplicación que se está ejecutando
    . nos permiten administrar la configuración de nuestras aplicaciones por separado de nuestro código base
    . nos permite almacenar los datos necesarios para el funcionamiento de la aplicación que cambian según el entorno en el que se ejecuta
    . al confiar en configuraciones externas, nuestra aplicación se puede implementar fácilmente en diferentes entornos. Estos cambios son independientes de los cambios en el código, por lo que no requieren que nuestra aplicación sea reconstruida. 
    . si las definimos desde la terminal (por ejemplo "export PORT=8080") solo existirán mientras permanezca abierta la shell
    . convencion definirlas en mayúscula
    . ejemplos:
        . Dirección y Puerto HTTP
        . Credenciales de Base de Datos
        . Credenciales de API's externas
        . Ubicación de archivos y carpetas estáticos


Dotenv
    . módulo que carga variables de entorno a "process.env" desde un archivo .env
    . si no pasamos objeto a config() busca por default un .env
        const dotenv = require('dotenv')
        dotenv.config()
    . si quiero decidir qué valores utilizar en función ejemplo del valor de una variable. Por ejemplo si la variable "MODE" tiene el valor "prod" va a importar los valores de las otras variables de un archivo prod.env, y si tiene el valor "dev" los va a importar de dev.env
    Pasando un objeto a config({patah: condicionalTernario})
        const dotenv = require('dotenv')
        dotenv.config({
            path: 
                process.env.MODO == 'byn'
                ? path.resolve(__dirname, 'byn.env')
                : path.resolve(__dirname, 'colores.env')
        })
    . en terminal (o en script de package.json):
        export MODE = dev; node index.js
    


Librerias
    . miniminst
    . yargs
    . dotenv