const { knex, migrate } = require('../../../src/database')
const saveMovies = require('../../../src/repositories/save-movies')
const { clearMovieTable } = require('./helpers')

beforeEach(async () => await clearMovieTable())

beforeAll((done) => {
  migrate()
    .finally(() => {
      done()
    })
})

afterAll((done) => {
  knex.destroy()
    .finally(() => {
      done()
    })
})

it('should save movies to database', async () => {
  const saved = await saveMovies([{
    originalId: 'a', title: 'b', description: 'c', director: 'd', producer: 'e',
    banner: 'f', poster: 'g'
  }])
  expect(saved).toHaveLength(1)
})
