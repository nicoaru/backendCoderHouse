Redis
    . Instalar redis-cli
        https://medium.com/@binary10111010/redis-cli-installation-on-windows-684fb6b6ac6b
    . Es un diccionario que se utiliza para facilitar la estructuracion de datos en formato clave-valor en memoria
    . Instalarlo
    . redis-cli
    . Para chequear que esté funcionando:
        redis-cli PING => debe responder PONG
    . Almacena los datos en memoria del servidor
    . Puerto default => 6379
    . Comandos:
        . SET =>    . gaurdamos una clave-valor
                    . con EX le ponemos un tiempo de expiracion
                    . SET nombre "Fulanito" EX 60
        
        . GET =>    . devuelve el valor de determinada clave
                    . GET nombre
                    . si no existe la clave devuelve "nil" (sería un null)
        
        . TTL =>    . TTL nombre
                    . devuleve el tiempo de existencia que le queda a una clave antes de expirar. -1 => no tiene tiempo de expiracion. -2 => ya expiró

        . EXPIRE => . EXPIRE nombre 60
                    . le agrega un tiempo de expiración a una clave previamente seteada

        . KEYS =>   . KEYS *
                    . devuelve todas las keys guardadas


Redis Lab
    . Nos permite usar redis pero conectandonos a un repositorio en linea donde guardar los datos, en vez de guardarlos en nuestro servidor.
    . Para servidores de prueba anda bien.
    . Comandos
        . FLUSHDB
        . FLUSHALL


Upstash
    . Otro servidor online para Redis


SessionMongo/MongoAtlas
    . Utilizar Mongo o MongoAtlas para guardar los datos de session
    . Crea la base de datos Sessions con una colección del mismo nombre
    . Los Id de cada documento de Sessions es el mismo string que la cookie correspondiente que guarda el navegador (no un ObjectId)


Devolver el html que corresponda:
    . app.get('/nombrePágina', (req, res) => {
        res.sendFile('path')
    })
    . res.redirect('path')

Librerias:
    . express-sessios
    . session-file-store
    . redis
    . connect-redis
    . connect-mongo



Dudas:
    . no pude conectarme a redisLab