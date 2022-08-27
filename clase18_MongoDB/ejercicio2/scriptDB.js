use empresa;
db.clientes.insertOne({nombre:"Juan", edad: 25});
db.clientes.insertMany([
    {nombre:"Maria", edad: 50},
    {nombre:"Pedro", edad: 30},
    {nombre:"Cacho", edad: 80}
]);

db.articulos.insertMany([
    {nombre:"Regla", precio:25, stock:35},
    {nombre:"Escuadra", precio:50, stock:150},
    {nombre:"Bidón", precio:200, stock:10}
]);

show collections;
db.clientes.find();
db.articulos.find();
db.clientes.find({nombre:"Pedro"}, {_id:1});
ObjectId("6308e3831c349cdc4082c533").getTimestamp().toLocaleString();
db.articulos.estimatedDocumentCount();

db.getCollection("unknown").find({})

show dbs;

use admin;
db.createUser(
    {
    user: "lector",
    pwd: "1234",
    roles: [ { role: "read", db: "empresa" } ]
    }
);
db.createUser(
    {
    user: "encargado",
    pwd: "123456",
    roles: [ { role: "readWrite", db: "empresa" } ]
    }
);

show collections;
db.system.users.find();