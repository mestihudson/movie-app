exports.up = function(knex) {
  return knex.schema.createTable('movie', (table) => {
    table.increments('id').primary()
    table.string('title', 200).notNullable()
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('movie')
}
