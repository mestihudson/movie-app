const { knex } = require('../../../src/database')

const clearMovieTable = async () => {
  await knex('movie').del()
  await knex.raw(`
    alter sequence movie_id_seq restart with 1;
    update movie set id = default;
  `)
}

module.exports = { clearMovieTable }
