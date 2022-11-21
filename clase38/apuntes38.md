
Capas de un servidor

    Capa de ruteo: 
        . maneja la interfaz de programación de aplicaciones (API). Su único trabajo es recibir las peticiones del cliente, delegar la tarea de computar la respuesta, y una vez obtenido el resultado retornarlo como respuesta al cliente.
        . routers
        . se comunica con la capa de presentación (frontEnd)
        . se comunica con la capa de servicios

    Capa de servicio (o controlador): 
        . maneja la lógica de negocios del app. Significa que los datos son transformados o calculados para cumplir con los requerimientos del cliente. Accede a los datos (leer-guardar) sólo a través de la capa de persistencia.
        . controllers -> enlace entre la cap de ruteo y la capa de servicio. Hace
        . servicios -> cuando utilizamos servicios de terceros. Por ejemplo apis externas

    Capa de persistencia: 
        . tiene acceso a la base de datos para crear, editar, o borrar datos. Preferentemente, aquí no debemos encontrar lógica de negocio, sino mecanismos relacionados con la infraestructura del servidor.
        . DAOs


Movimiento entre capas
    . Cuando entra una petición hecha por el cliente a la API, es recibida en el servidor por la capa de ruteo.
    . El componente en la capa de ruteo llama al componente en la capa de servicio, y se encarga de esperar por la respuesta de la capa de servicio para así retornarlo al cliente. 
    . Los datos son transformados, calculados o validadoos en la capa de servicio antes de pasarlos a la siguiente capa. 
    . El componente en la capa de servicios llama al componente inyectado de la capa de persistencia y le pasa los datos. 
    . Finalmente, se lleva a cabo la solicitud de datos al servidor de base de datos en la capa de persistencia. A esta capa se accede mediante llamados asincrónicos (preferentemente utilizando promesas).
    . Cuando el llamado a la capa de persistencia se resuelve con la respuesta del servidor de base de datos, la respuesta retorna a la capa de servicio. 
    . Esta retorna a la capa de rutas. Si es necesario, la capa de servicio llevará a cabo operaciones de transformación sobre los datos recibidos de la capa de persistencia. 
    . Cuando la respuesta alcanza la capa de rutas, ésta procede a enviarlos al cliente como respuesta. 
    . Debemos tener en cuenta que los datos, solicitudes y respuestas no deben saltear capas.


Componentes
    . Server: 
        . inicializa la aplicación, y carga los routers correspondientes.
        . es el componente con el cual se comunica el cliente, y hace de interfaz entre el Cliente y la capa de Ruteo
    . Router: 
        . contiene los métodos disponibles para cada recurso de la aplicación.
        . son los únicos en donde encontraremos referencias a la naturaleza de cliente-servidor de nuestro sistema (por ejemplo: referencias a la librería Express)
    . Controller: 
        . contiene las funciones que resolverán cada petición que llegue a cada una de las rutas definidas.
        . constituyen la interfaz entre la capa de ruteo y la capa de negocios.
    . Service: 
        . contiene las funciones con la lógica de negocio relacionada a los recursos del sistema.
        . aquí se realizan todas las validaciones y se toman las decisiones para cuidar que se cumplan las reglas del negocio que se está modelando. Suele ser únicamente javascript puro.
    . Data Access Object (DAO): 
        . contiene las funciones relacionadas con el acceso a la base de datos.
        . constituyen la Capa de Persistencia, y son los únicos lugares en donde encontraremos referencias al almacenamiento de datos (referencias a la librería Mongoose, o Firebase, etc).
