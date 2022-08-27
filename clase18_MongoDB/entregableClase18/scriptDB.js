use ecommerce;

// Crear la colleción 'productos' e insertar 10 documentos en ella
db.productos.insertMany([
    {nombre: 'Regla',
    codigo: 'SKU 25654321',
    precio: 150,
    timeStamp: Date.now(),
    descripcion: 'Regla para medir de peter pan',
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/streamline-icon-set-free-pack/48/Streamline-29-256.png'},
    {nombre: 'Escuadra',
    codigo: 'SKU 987651354',
    precio: 250,
    timeStamp: Date.now(),
    descripcion: 'Escuadra 90° y 45°',
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-512.png'},
    {nombre: 'Cartuchera',
    codigo: 'SKU 56464654',
    precio: 4250,
    timeStamp: Date.now(),
    descripcion: 'Cartuchera los tres chanchitos',
    thumbnail: 'https://cdn2.iconfinder.com/data/icons/Red_Little_Shoes_for_Windows/256/PencilBox.png'},
    {nombre: 'Birome',
    codigo: 'SKU 464554654',
    precio: 4360,
    timeStamp: Date.now(),
    descripcion: 'Pack de 500 biromes marca Bic',
    thumbnail: 'https://cdn4.iconfinder.com/data/icons/48-bubbles/48/16.Pen-256.png'},
    {nombre: 'Mochila',
    codigo: 'SKU 643194545',
    precio: 2500,
    timeStamp: Date.now(),
    descripcion: 'Mochila Alicia en el país',
    thumbnail: 'https://cdn1.iconfinder.com/data/icons/camping-65/500/backpack-256.png'},
    {nombre: 'Zapatillas',
    codigo: 'SKU 46454651',
    precio: 180,
    timeStamp: Date.now(),
    descripcion: 'Zapatilla el increible hulk',
    thumbnail: 'https://cdn0.iconfinder.com/data/icons/women-shoes-line-color-pinky-fashion/512/Wedge_sneaker-256.png'},
    {nombre: 'Skate',
    codigo: 'SKU 1233124564',
    precio: 150,
    timeStamp: Date.now(),
    descripcion: 'Skate para niñes',
    thumbnail: 'https://cdn1.iconfinder.com/data/icons/sport-black-line/24/sport_Skate-256.png'},
    {nombre: 'Pelota',
    codigo: 'SKU 684516546',
    precio: 3999,
    timeStamp: Date.now(),
    descripcion: 'Pelota de colores inflable',
    thumbnail: 'https://cdn1.iconfinder.com/data/icons/social-58/128/Social-38-256.png'},
    {nombre: 'Masa',
    codigo: 'SKU 21649846',
    precio: 4000,
    timeStamp: Date.now(),
    descripcion: 'Masa para modelar por 2kg',
    thumbnail: 'https://cdn0.iconfinder.com/data/icons/thai-food-flat-spicy-traditional-cuisine/349/sweet_stuffed_dough-256.png'},
    {nombre: 'Plastilina',
    codigo: 'SKU 3186456',
    precio: 580,
    timeStamp: Date.now(),
    descripcion: 'Plastilina x 10 colores',
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/fantastic_dream/file_clay_ocean.png'}
]);

// Crear la colleción 'mensajes' e insertar 10 documentos en ella
db.mensajes.insertMany([
    {message:"Hola",
    author:"Nico",
    timeStamp: Date.now()},
    {message:"Ey como va?",
    author:"Luciana",
    timeStamp: Date.now()},
    {message:"Todo bien",
    author:"Nico",
    timeStamp: Date.now()},
    {message:"Vos?",
    author:"Nico",
    timeStamp: Date.now()},
    {message:"Tranqui también, aca andamos",
    author:"Luciana",
    timeStamp: Date.now()},
    {message:"Que contas?",
    author:"Luciana",
    timeStamp: Date.now()},
    {message:"Tomamos unos mates?",
    author:"Nico",
    timeStamp: Date.now()},
    {message:"Con unas buenas tortas fritas...",
    author:"Nico",
    timeStamp: Date.now()},
    {message:"uUhhh si",
    author:"Luciana",
    timeStamp: Date.now()},
    {message:"Grosaaa",
    author:"Nico",
    timeStamp: Date.now()},
]);

// Listar todos los documentos en cada colección.
db.productos.find();
db.mensajes.find();

// Mostrar la cantidad de documentos almacenados en cada colección
db.productos.estimatedDocumentCount();
db.mensajes.estimatedDocumentCount();

// Agregar un producto más en la colección de productos 
db.productos.insertOne(
    {nombre: 'Gorrita',
    codigo: 'SKU 21646466',
    precio: 750,
    timeStamp: Date.now(),
    descripcion: 'Gorra con viscera color azul',
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/summertime-6/512/cap_hat-512.png'}
)

// Realizar una consulta por nombre de producto específico
db.productos.find({nombre: 'Gorrita'});

// Listar los productos con precio menor a 1000 pesos
db.productos.find({precio: {$lt:1000}});

// Listar los productos con precio entre los 1000 a 3000 pesos
db.productos.find({$and: [{precio: {$gte:1000}}, {precio: {$lt:3000}}]})

// Listar los productos con precio mayor a 3000 pesos
db.productos.find({precio: {$gt:3000}});

// Realizar una consulta que traiga sólo el nombre del tercer producto más barato
db.productos.find({},{'nombre':1}).sort({precio:1}).skip(2).limit(1);

// Hacer una actualización sobre todos los productos, agregando el campo stock a todos ellos con un valor de 100
db.productos.updateMany({}, {$set: {stock:100}});

// Cambiar el stock a cero de los productos con precios mayores a 4000 pesos.
db.productos.updateMany({precio: {$gt:4000}}, {$set: {stock: 0}});

// Borrar los productos con precio menor a 1000 pesos
db.productos.deleteMany({precio: {$lt:1000}});


// Crear usuario con permisos de lectura
use admin;
db.createUser({user:"pepe", pwd:"asd456", roles:[{role:"read", db:"ecommerce"}]});

