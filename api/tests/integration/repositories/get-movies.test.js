const { knex } = require('../../../src/database')
const getMovies = require('../../../src/repositories/get-movies')
const { clearMovieTable } = require('./helpers')

beforeEach(async () => await clearMovieTable())

it('should get all movies from database', async () => {
  await knex('movie').insert([{
    title: 'Black Panther', description: 'bp', director: 'bp', producer: 'bp',
    banner: 'bp', poster: 'bp', originalId: '1'
  }])
  const retrieved = await getMovies()
  expect(retrieved).toHaveLength(1)
})
