
Capas de un servidor

    Capa de ruteo: 
        . maneja la interfaz de programación de aplicaciones (API). Su único trabajo es recibir las peticiones del cliente, delegar la tarea de computar la respuesta, y una vez obtenido el resultado retornarlo como respuesta al cliente.
        . routers
        . se comunica con la capa de presentación (frontEnd)

    Capa de servicio (o controlador): 
        . maneja la lógica de negocios del app. Significa que los datos son transformados o calculados para cumplir con los requerimientos del cliente. Accede a los datos (leer-guardar) sólo a través de la capa de persistencia.
        . controllers
        . servicios

    Capa de persistencia: 
        . tiene acceso a la base de datos para crear, editar, o borrar datos. Preferentemente, aquí no debemos encontrar lógica de negocio, sino mecanismos relacionados con la infraestructura del servidor.
        . DAOs