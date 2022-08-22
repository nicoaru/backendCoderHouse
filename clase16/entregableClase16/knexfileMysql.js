const dotenv = require("dotenv")
dotenv.config();

const DATABASE_HOST = process.env.DATABASE_HOST 
const DATABASE_PORT = process.env.DATABASE_PORT
const DATABASE_USER = process.env.DATABASE_USER
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD
const DATABASE_NAME = process.env.DATABASE_NAME

// console.log(DATABASE_HOST, DATABASE_PORT, DATABASE_USER, DATABASE_PASSWORD);
const knexConfigMysql = {
  client: 'mysql',
  connection: {
    host: DATABASE_HOST,
    port: DATABASE_PORT,
    user: DATABASE_USER,
    password: DATABASE_PASSWORD,
    database: DATABASE_NAME,
  },
  migrations: {
    tableName: 'knex_migrations_mysql',
    directory: './knex/mysql/migrations/'
  },
  seeds: {
    tableName: 'knex_seeds_mysql',
    directory: './knex/mysql/seeds/',
  }
}

module.exports = knexConfigMysql;

// Crear una nueva migración:
// knex migrate:make <nombre_migracion> --knexfile <path al knexfile correspondiente>

// Creare una nueva seed (Data inicial):
// knex seed:make <nombre_seed>  --knexfile <path al knexfile correspondiente>