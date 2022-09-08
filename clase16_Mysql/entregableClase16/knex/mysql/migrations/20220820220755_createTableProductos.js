/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('productos', table => {
    table.increments('id').primary().notNullable().unique();
    table.string('nombre', 255).notNullable();
    table.string('codigo', 255).notNullable();
    table.float('precio');
    table.integer('stock');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('productos');
};
