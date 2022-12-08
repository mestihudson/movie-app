const { knex } = require('../database')

module.exports = (movies) => {
  const originalIds = movies.map(({ originalId }) => originalId)
  return knex
    .select('originalId')
    .from('movie')
    .whereIn(
      'originalId',
      originalIds
    )
    .then((existing) => {
      const remaining = movies.filter(({ originalId }) => {
        const found = existing.some((e) => {
          return e.originalId == originalId
        })
        return !found
      })
      return Promise.resolve(remaining)
    })
    .catch((error) => {
      console.error(error)
      return Promise.resolve([])
    })
}
