Librerías: 
    . cookie-parser
    . express-session

Cookie-Parser
    . lo usamos para firmar las cookies signed
    . le pasamos una string para firmar y decodificar las cookies
    . la firma debe ser la misma con la que fue firmada, y con la que la compara el servidor


Inspector => Application: allí podemos ver las sessionStorae, localStorage, cookies, etc

El objeto request de toda peticion tiene las propiedades cookies, session

request.session?.user => 

Cookies
    . Se almacenan en el navegador

SessionStorage
    . Se almacenan en el servidor
    . Al reiniciar el servidor se borran
    . Se les puede agregar persistencia

Fetch
    . Ver ejemplos en el repositorio del profe


