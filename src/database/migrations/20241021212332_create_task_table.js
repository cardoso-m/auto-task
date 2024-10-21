/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('task', function(table) {
      table.increments('id').primary()
      table.string('name').notNullable()
      table.text('description').notNullable()
      table.integer('client_id').unsigned().notNullable().references('id').inTable('user').onDelete('CASCADE')
      table.integer('priority').notNullable() // Prioridade pode ser representada por um número, como 1, 2, 3...
      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.timestamp('updated_at').defaultTo(knex.fn.now())
      table.timestamp('expires_in').notNullable()
    })
  }

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('task')
  }
