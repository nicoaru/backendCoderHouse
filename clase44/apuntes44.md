
GraphQL
    . Creada como alternativa a las APIRest
    . Es un lenguaje de consulta (sintaxis propia) y un tiempo de ejecución del servidor para las API. 
    . Su función es brindar a los clientes exactamente los datos que solicitan y nada más.
    . Los desarrolladores de la API utilizan GraphQL para crear un esquema que describa todos los datos posibles que los clientes pueden consultar a través del servicio.
    . Un esquema de GraphQL está compuesto por tipos de objetos, que definen qué clase de objetos puede solicitar y cuáles son sus campos. A medida que ingresan las consultas, GraphQL las aprueba o rechaza en función del esquema, y luego ejecuta las validadas.
    . El desarrollador de API adjunta cada campo de un esquema a una función llamada resolución. Durante la ejecución, se llama a la resolución para que genere el valor.
    . No exige una arquitectura particular.
    . Puede aplicarse sobre una APIRest actual.
    . Delega gran parte del trabajo de las consultas de datos al servidor, lo cual representa una mayor complejidad para los desarrolladores de servidores.

    . Los clientes pueden realizar:
        . Consultas GraphQL: permiten consumir datos, especificando cuáles y cómo se desea recibirlos.
        . Mutaciones GraphQL: permiten escribir o modificar datos en el servidor.

    . Habilitar GraphiQL nos permite usar una interfaz gráfica desde el navegador


Módulos Node
    . crypto

Librerías
    . graphql
    . express-graphql
    . Agregar --force, si no me permite instalar una dependencia en npm