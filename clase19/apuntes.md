
Mongoose
. Permite definir esquemas (Schema) de los documentos que serán guardados a las distintas colecciones
. Y realizar la conexión entre Node.js y la DB de mongoDB (instancia de MongoDB)
. Es un Object Document Mapper (ODM). Permite definir objetos con un esquema fuertemente tipado que se asigna a un documento MongoDB.
. Usa un objeto Schema para definir una lista de propiedades del documento, cada una con su propio tipo y características para forzar la estructura del documento. 
. Después de especificar un esquema deberemos definir un Modelo constructor para así poder crear instancias de los documentos de MongoDB
. Cada tipo de dato permite especificar:
    . Un valor predeterminado
    . Una función de validación personalizada
    . La indicación de campo requerido
    . Una función get que le permite manipular los datos antes de que se devuelva como un objeto
    . Una función de conjunto que le permite manipular los datos antes de guardarlos en la base de datos
    . Crear índices para permitir que los datos se obtengan más rápido
. Además, ciertos tipos de datos permiten personalizar cómo se almacenan y recuperan los datos de la base de datos.

. npm i monggose

Mongodb
. Podemos conectarnos a la DB din mongoose, directamente con el package mongodb
. npm i mongodb

Buffer
. El tipo buffer es algo que sirve para guardar datos en binario, generalmente el buffer lo usamos para almacenar imagenes