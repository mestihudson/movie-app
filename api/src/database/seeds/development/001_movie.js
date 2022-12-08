exports.seed = async function(knex) {
  await knex('movie').del()
  await knex.raw(`
    alter sequence movie_id_seq restart with 1;
    update movie set id = default;
  `)
}
