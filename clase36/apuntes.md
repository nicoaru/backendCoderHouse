si - Menu de signup
si - Menu de login con email y password
si - Passport local
Datos de usuarios creados se guardan en DB incluyendo password encriptada
Foto se guarda en carpeta pública del servidor
    . email -
    . password -
    . nombre - 
    . dirección -
    . edad -
    . teléfono (con prefijos internacionales) -
    . foto -

- Signup -> Login - ok
- Login -> Home - ok

. Home
    . Menu
        . Ver productos
        . Ver carrito
        . Datos personales con foto
        . Desloguearse

. Mandar email al administrador (email almacenado en variable global) desde el servidor cada vez que se registra un usuario nuevo
    . datos de registro y asunto 'nuevo registro'

. Mandar email y whatsapp (numero almacenado en variable global) al administrador desde el servidor cada vez que un usuario haga un pedido
    . El usuario iniciará la acción de pedido en la vista del carrito.
    . Será enviado una vez finalizada la elección para la realizar la compra de productos.
    . El email contendrá en su cuerpo la lista completa de productos a comprar y en el asunto la frase 'nuevo pedido de ' y el nombre y email del usuario que los solicitó. En el mensaje de whatsapp se debe enviar la misma información del asunto del email.

. El usuario recibirá un mensaje de texto al número que haya registrado, indicando que su pedido ha sido recibido y se encuentra en proceso.

. El servidor trabajará con una base de datos DBaaS (MongoDB Atlas) y estará preparado para trabajar en forma local o en la nube a través de la plataforma PaaS Heroku.

. Habilitar el modo cluster para el servidor, como opcional a través de una constante global.

. Utilizar alguno de los loggers ya vistos y así reemplazar todos los mensajes a consola por logs eficientes hacia la misma consola. 

. En caso de errores moderados ó graves el log tendrá además como destino un archivo elegido.
Realizar una prueba de performance en modo local, con y sin cluster, utilizando Artillery en el endpoint del listado de productos (con el usuario vez logueado). Verificar los resultados.
