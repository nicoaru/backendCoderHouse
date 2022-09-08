/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.alterTable('productos', table => {
        table.integer('timeStamp').notNullable();
        table.string('descripcion', 255);
        table.string('thumbnail', 255);
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable('productos', table => {
        table.dropColumn('timeStamp');
        table.dropColumn('descripcion');
        table.dropColumn('thumbnail');
    })
    };
