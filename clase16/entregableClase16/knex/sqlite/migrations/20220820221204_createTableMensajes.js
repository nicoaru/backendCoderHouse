/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('mensajes', table => {
        table.increments('messageId').primary().notNullable().unique();
        table.string('socketId', 255).notNullable();
        table.string('message', 255).notNullable();
        table.string('author', 255).notNullable();
        table.integer('timeStamp').notNullable()
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('mensajes')
};
