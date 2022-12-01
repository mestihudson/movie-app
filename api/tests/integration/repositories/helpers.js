const { knex } = require('../../../src/database')

const clearMovieTable = async () => {
  await knex.raw(`
    alter sequence movie_id_seq restart with 1;
    update movie set id = default;
  `)
  await knex('movie').del()
}

module.exports = { clearMovieTable }
