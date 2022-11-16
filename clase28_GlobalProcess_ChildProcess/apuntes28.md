Global Process y Child Process


Process
    . ejemplos
        process.pid
        process.platform
        process.cwd()
        process.memoryUsage()
        process.exit()
        process.execPath
        process.stdout
        process.stdout.write()
        process.on('evento', callback)
    . process.on("uncaughtException, () => {})
        . ejecuta la callback cuando se lanza un error que no es catcheado en el código, en el proceso global




Child Process
    . NodeJS ejecuta una tarea a la vez (single thread / único hilo)
    . Child-process nos permite ejecutar tareas asíncronas, dentro del proceso global
    . es decir ¿primero ejecuta las tareas sincrónicas y luego las asíncronas?
    . nos permite acceder a las funcionalidades del sistema operativo ejecutando cualquier comando del sistema dentro de un proceso secundario
    . podemos controlar el flujo de entrada del proceso secundario y escuchar su flujo de salida. También podemos controlar los argumentos que se pasarán al comando del sistema operativo subyacente y podemos hacer lo que queramos con la salida de ese comando. Por ejemplo, encadenar la salida de un comando como entrada de otro
    . los procesos secundarios pueden comunicarse entre sí con un sistema de mensajería
    . necesitamos importar el módulo ' child-process', en el cual hay 4 funciones con cuales crear procesos secundarios:
        . exec()
            . permite ejecutar comandos del sistema, los cuales son procesados y ejecutados por una shell generada por exec() a tal fin
            . la salida generada como resultado es almacenanda en búfer, ocupando memoria del sistema
            . se usa la sintaxis de la shell
            . para acceder al resultado, lo hacemos mediante los parámetros de la callback que le pasamos
            . 1er parámetro: comando a ejecutar, con argumentos separados por espacios
            . 2do parámetro(opcional): objeto de opciones
            . último parámetro: callback(error, stdout, stderr)

        . execFile()
            . permite ejecutar un archivo (¿de qué tipo?)
            . la salida generada como resultado es almacenada en un buffer, ocupando memoria del sistema
            . no genera una shell, sino que el archivo se ejecuta como un nuevo proceso (lo cual lo hace un poco más eficiente)
            . pasando la opcion shell:true lo ejecuta en una shell
            . para acceder al resultado, lo hacemos mediante los parámetros de la callback que le pasamos
            . 1er parámetro: archivo a ejecutar
            . 2do parámetro(opcional): array con argumentos en formato string
            . 3er parámetro(opcional): objeto de opciones
            . último parámetro: callback(error, stdout, stderr)

        . spawn()
            . ejecuta el comando en un nuevo proceso
            . no almacena la salida generada en un buffer, sino que devuelve datos a través child.stdout y child.stderr (de la API Stream). 
            . para obtener el resultado del proceso secundario, debemos escuchar los eventos del stream:
                child.stdout.on('data', () => {})
                child.stdouterr.on('data', () => {})            
            . el objeto que resulta de ejecutar la función spawn() es una instancia de ChildProcess, que implementa la API EventEmitter:             
                child.on('error', () => {})
                child.on('disconnet', () => {})
                child.on('close', () => {})
                child.on('exit', () => {})
                child.on('message', () => {})
            . 1er parámetro: comando a ejecutar
            . 2do parámetro(opcional): array con argumentos en formato string
            . 3er parámetro(opcional): objeto de opciones





        . fork()
            . ejecuta un módulo .js
            . crea un proceso hijo independiente del proceso padre
            . se comunican padre e hijo entre si, con el método .send() y el evento message()
            . se estila que el hijo mande un msg al padre cuando se encuentra listo para comenzar a ejecutar (ya que ES6 importa modulos de manera asincrona) y el padre le responde con algun msg para que arranque
            . y cuando el proceso hijo termina de ejecutarse puede mandar un msg al padre con el resultado
            . no cuenta con la opcion de ejecutar en shell
            . fork() crea un objeto al que se pueden aplicar métodos y escuchar eventos
                . .send() 
                . .on('message', () => {})
            . 1er parámetro: path al módulo .js
            . 2do parámetro(opcional): array con argumentos en formato string
            . 3er parámetro(opcional): objeto de opciones

Express
    . Ya viene con un sistema automático de manejo de subprocesos incoporado

