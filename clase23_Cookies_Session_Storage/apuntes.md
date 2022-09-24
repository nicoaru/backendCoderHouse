Clase 23 - Cookies y session con express

HTTP, Cookies y Sessions
    . HTTP es un protocolo sin estado, por lo tanto cada petición es completamente independiente de otra y no hay forma de compartir información entre las peticiones, o asociarlas entre si.
    . Las COOKIES nos permiten almacenar información enviada por el servidor, en lado del cliente (navegador), y reenviarlas junto con cada nueva petición. 
    . Las SESSIONS por el contrario almacenan la información asociada a un cliente en el servidor. 
    . Para asociar dicha información con un cliente, cada SESSION tiene un Id que se usa como referencia, y se crea una cokkie del lado del cliente que contiene dicha referencia.
    . Entonces en la cookie no se guarda la información, sino unicamente la referencia a esa informacion en el servidor. 

Cookies
    . Es una pequeña pieza de datos (omo si fuera un objeto JS) que un servidor envía a el navegador web del usuario. 
    . El navegador guarda estos datos en un archivo (del lado del cliente). 
    . Y los envía de regreso junto con cada nueva petición al mismo servidor, en el objeto request. 
    . Se usan generalmente para decirle al servidor que dos peticiones tienen su origen en el mismo navegador web
    . Esto permite, por ejemplo, mantener la sesión de un usuario abierta. 
    . Permiten recordar la información de estado en vista a que el protocolo HTTP es un protocolo sin estado.
    . Principales usos:
        . Gestión de Sesiones: inicios de sesión, carritos, puntajes de juegos o cualquier otra cosa que el servidor deba recordar
        . Personalización: preferencias de usuario, temas y otras configuraciones
        . Rastreo: guardar y analizar el comportamiento del usuario
    . No utilizar para el almacenamiento general del lado del cliente. Para ello utilizar:
        . localStorage 
        . sessionStorage
    . Al almacenarse del lado del cliente, el espacio con el que se cuenta es limitado
    . No se deben almacenar datos sensibles en las cookies.
    . Se les puede configurar un tiempo de vida, tras el cual la cookie se elimina del navegador.
    . Hay cookies y cookieSigned


Sessions
    . Una SESSION es una pieza de información asociada a un cliente que se guarda del lado del servidor
    . Para lograr esta asociación entre SESSION y cliente se crea una COOKIE que contiene el Id de referencia a dicha SESSION
    . Se les puede agregar persistencia para que no se borren (en archivos o DB) para que no se borren con cada reinicio de servidor


cookie-parser (libreria)
    . lo utilizamos como root middleware de express
            const express = require('express')
            const cookieParser = require('cookie-parser')
            const app = express()
            app.use(cookieParser())
    . lo usamos para firmar las cookies signed
    . le pasamos una string para firmar y decodificar las cookies
    . la firma con la que la compara el servidor debe ser la misma con la que fue firmada 

express-session (librería)





Inspector => Application: allí podemos ver las sessionStorae, localStorage, cookies, etc

Las librerías se encargan de crear las propiedades cookies y session, en el objeto request de cada petición. 


Fetch
    . Ver ejemplos en el repositorio del profe


Librerias: 
    . cookie-parser
    . express-session
