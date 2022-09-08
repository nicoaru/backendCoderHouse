const dotenv = require("dotenv").config();
const express = require("express")
const Contenedor = require("./Contenedor");

const knex = require("knex")
const knexConfigMySql = {
    client: 'mysql',
    connection: {
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT,
      user: process.env.DATABASE_USER,
      database: process.env.DATABASE_NAME,
    }
}
const databaseMySql = knex(knexConfigMySql)

const articulos = [
    {nombre:'Regla',
    codigo:'123456',
    precio:10,
    stock:5},
    {nombre:'Resma',
    codigo:'789123',
    precio:15,
    stock:10},
    {nombre:'Escuadra',
    codigo:'456789',
    precio:20,
    stock:15},
    {nombre:'Lápiz',
    codigo:'123159',
    precio:25,
    stock:20},
    {nombre:'Lapicera fuente Parker',
    codigo:'753321',
    precio:30,
    stock:25}
]


// .THEN se puede usar con return siguiente promesa, para no hacer anidamiento enorme e inentendible

databaseMySql.schema.dropTableIfExists("articulos")
.then((res) => {
    console.log("resDropTable => ", res)
    return databaseMySql.schema.createTable("articulos", table => {
        table.increments('id').primary().notNullable().unique();
        table.string('nombre', 15).notNullable();
        table.string('codigo', 10).notNullable();
        table.float('precio');
        table.integer('stock')
    })
})
.then((res) => {
    console.log("resCreateTable => ", res)
    return databaseMySql("articulos").insert(articulos)
})
.then((res) => {
    console.log("resInsert => ", res)
    return databaseMySql.select().from("articulos")
})
.then(res => {
    console.log("resSelect => ", res)
    return databaseMySql('articulos').where({ id: 3 }).del()
})
.then(res => {
    console.log("resDel => ", res)
    databaseMySql('articulos').where({ id: 2 }).update({ stock: 0 })
    .then(res => console.log("resUpdate => ", res))
    .catch(error => console.log("Error => ", error))
})
.catch(error => console.log("Error => ", error))
