const { knex, migrate } = require('../../../src/database')
const saveMovies = require('../../../src/repositories/save-movies')

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

beforeEach((done) => {
  knex
    .raw(`
      alter sequence movie_id_seq restart with 1;
      update movie set id = default;
    `)
    .then(() => {
      knex('movie')
        .del()
        .finally(() => {
          done()
        })
    })
})

it('should save movies to database', async () => {
  const saved = await saveMovies([{
    originalId: 'a', title: 'b', description: 'c', director: 'd', producer: 'e',
    banner: 'f', poster: 'g'
  }])
  expect(saved).toHaveLength(1)
})
