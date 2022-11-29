const request = require('supertest')

const api = require('../../src/app')
const { knex, migrate } = require('../../src/database')

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

describe('get /movies', () => {
  it('should return all movies from database', async () => {
    const { status, body } = await request(api)
      .get('/movies')
    expect(status).toBe(200)
    expect(body).toHaveLength(2)
  })
})

