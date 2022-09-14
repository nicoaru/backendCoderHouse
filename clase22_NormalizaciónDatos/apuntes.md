TimeComplexity
 . Está bien Tiempo Lineal
 . Ncuadrado es un desastre. Es forEach anidado dentro de otro forEach
 . Tiempo Logarítmico es lo ideal. Búsqueda binaria.
 . Este último se puede lograr con la normalización de datos
 
Normalización de datos
    . Es un proceso de estandarización y validación de datos que consiste en eliminar las redundancias (datos duplicados) e inconsistencias, completando datos mediante una serie de reglas que actualizan la información protegiendo su integridad
    . Al normalizar los datos, debemos seguir algunas reglas:
        . La estructura de datos debe ser plana (no anidada) 
        . Cada entidad debe almacenarse como propiedad de objeto diferente
        . Las relaciones con otras entidades deben crearse basadas en sus Id
    . Todo gira en torno a Entidades que se relacionan entre sí (parecido al modelo relacional de SQL)

    . Paquetes:
        . normalizr


Normalizr
    . Normalizr funciona definiendo esquemas/entidades y luego declarando cómo estos esquemas se relacionan entre sí
    . El único requisito es que cada entidad tenga la propiedad ‘id’ (o podemos definirle que use otra propiedad a tales fines)
    . Cada schema/entidad es definida con normalizr.schema.Entity(<nombreEntidad>, {<estructura del objeto>})
        . Sólo definimos los campos que referencian a otras entidades (como las claves foreneas de SQL)
        . Si la entidad no tiene tiene referencia a otras entidades, los definimos como objeto vacío
    . Ejemplo definicion de esquemas/entidades:
            const author = new schema.Entity("authors", {});

            const comment = new schema.Entity("comments", {
            commenter: author
            });

            const post = new schema.Entity("posts", {
            comments: [comment],
            author: author
            });