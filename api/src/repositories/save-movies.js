const { knex } = require('../database')

module.exports = (movies) => {
  return knex
    .insert(movies, ['id'])
    .into('movie')
    .then((result) => Promise.resolve(result))
}
