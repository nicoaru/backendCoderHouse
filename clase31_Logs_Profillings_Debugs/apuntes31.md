

. Utilizar siempre funciones asíncronas, excepto que no sea posible
. Solo utilzar funciones síncronas en el arranque inicial de la aplicación

. Capturar todas las excepciones y errores que puedan ocurrir, utilizando Try/Catch o Promises, ya que si no se bloquea la aplicación
. Configurar para que el servidor se reinicie si se bloque por un Error o Excepción, con PM2

. Definir NODE_ENV en process.env, con dotenv
. NODE_ENV sería desarrollo o producción, en general

. Utilizar un middleware de compresionón como gzip, hace que las response pesen menos (excepto que sea una aplicación trafico elevado, en ese caso no es bueno)

. Tener el servidor funcionando como cluster. Resgistrar el bloque de los workers y generar un nuevo proceso utilizando cluster.fork()

. Almacenar en cache los resultados de las request, con Nginx
. Balancear las cargas, con Nginx
. Usar un proxy inverso como Nginx


. Loggers
    . configurarlo en archivo aparte loggerConfig.js
    . requerirlo en el archivo donde se use: 
        require(./loggerConfig.js)

    . log4js
        . appenders: dónde van a quedar registrados los logs
        . categories: cada categoría va a tener definid... un appender y un level. Dejar una con nombre default para que quede como default
        . level: significa que en esa categoría sólo va a loggear lo que tenga esa jerarquía o más, lo que tiene menos jerarquía no
        . 
            const log4js = require('log4js)
            log4js.configure({
                appenders: {}, 
                categories: {}
            })

            const logger = log4js.getLogger("categorieName")
            logger.info("...")
            logger.error("...")

    . winston
        . es parecido a log4js
        . imprime un JSON


Librerias
    . gzip
    . log4js
    . winston
    . pino