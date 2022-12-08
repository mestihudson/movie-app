const { knex } = require('../database')

module.exports = (movies) => {
  if (movies.length) {
    return knex
      .insert(movies, ['id'])
      .into('movie')
      .then((result) => {
        return Promise.resolve(result)
      })
      .catch((error) => {
        console.error(error)
        return Promise.reject(error)
      })
  }
  return Promise.resolve([])
}
