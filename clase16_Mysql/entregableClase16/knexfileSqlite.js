const dotenv = require("dotenv")
dotenv.config();

const DATABASE_FILENAME = process.env.DATABASE_FILENAME

// console.log(DATABASE_HOST, DATABASE_PORT, DATABASE_USER, DATABASE_PASSWORD);
const knexConfigSqlite = {
  client: 'sqlite3',
  connection: {
    filename: DATABASE_FILENAME
  },
  migrations: {
    tableName: 'knex_migrations_sqlite',
    directory: './knex/sqlite/migrations/'
  },
  seeds: {
    tableName: 'knex_seeds_sqlite',
    directory: './knex/sqlite/seeds/',
  }
}

module.exports = knexConfigSqlite;

// Crear una nueva migración:
// knex migrate:make <nombre_migracion> --knexfile <path al knexfile correspondiente>

// Creare una nueva seed (Data inicial):
// knex seed:make <nombre_seed>  --knexfile <path al knexfile correspondiente>