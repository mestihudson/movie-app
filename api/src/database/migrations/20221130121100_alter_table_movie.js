exports.up = function(knex) {
  return knex.schema.alterTable('movie', (table) => {
    table.string('description', 2000).notNullable()
    table.string('director', 200).notNullable()
    table.string('producer', 200).notNullable()
    table.string('banner', 200).notNullable()
    table.string('poster', 200).notNullable()
    table.string('originalId', 200).notNullable()
    table.unique('originalId')
  })
}

exports.down = function(knex) {
  return knex.schema.alterTable('movie', (table) => {
    table.dropUnique('originalId')
    table.dropColumn('originalId')
    table.dropColumn('poster')
    table.dropColumn('banner')
    table.dropColumn('producer')
    table.dropColumn('director')
    table.dropColumn('description')
  })
}
