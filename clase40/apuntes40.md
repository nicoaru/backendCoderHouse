typescript
    . ver packagejson del ejemplo del profe, de la clase 40


DTO
    . El patrón DTO tiene como finalidad crear un objeto plano (POJO: Plain Old Javascript Object) con una serie de atributos que puedan ser enviados o recuperados del servidor en una sola invocación.
    . Un DTO se conforma de una serie de atributos que pueden o no, ser obtenidos de multiples fuentes de datos (DBs) o tablas y concentrarlas en una única clase simple.
    . También nos permite omitir información que el usuario no requiere, o por cuestiones de seguridad (como es el caso de la password).
    . DTO es un objeto que se crea para reunir la información de varios objetos o modificar uno existente para crear 'vistas' de información y devolverle al cliente datos adaptados.
    . Los DTO son un patrón muy efectivo para transmitir información entre un cliente y un servidor, pues nos permite crear estructuras de datos independientes de nuestro modelo de datos, lo que nos permite crear cuantas “vistas” sean necesarias de un conjunto de tablas u orígenes de datos. 
    . Además, si por alguna razón, el modelo de datos cambió el cliente no se afectará, pues seguirá recibiendo el mismo DTO.
    . Los DTO son objetos instanciados a partir de una clase (ej: class ProductoDTO, class PedidoDTO, etc.)
    . Se instancian en la capa de Services (en los Controllers por ejemplo)
    . El constructor puede recibir como parámetros, los diferentes objetos de los que se nutre el DTO


Factory
    . ver https://refactoring.guru/es/design-patterns

