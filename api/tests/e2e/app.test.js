const nock = require('nock')
const request = require('supertest')

const api = require('../../src/app')
const { knex, migrate } = require('../../src/database')
const { mockTmdbCall } = require('../integration/services/get-movies/adapters/helpers')

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

describe('get /movies', () => {
  it('should return all movies from database', async () => {
    await knex('movie').insert([
      { id: 1, title: 'Black Panther', description: 'bp', director: 'bp', producer: 'bp', banner: 'bp', poster: 'bp', originalId: '1' },
      { id: 2, title: 'Top Gun', description: 'tg', director: 'tg', producer: 'tg', banner: 'tg', poster: 'tg', originalId: '2' },
    ])
    const { status, body } = await request(api)
      .get('/movies')
    expect(status).toBe(200)
    expect(body).toHaveLength(2)
  })
})

describe('get /update', () => {
  beforeEach(() => {
    nock.cleanAll()
  })

  it('should retrieve data from ghibli api', async () => {
    await mockTmdbCall()

    const { status, body } = await request(api)
      .get('/update')
    expect(status).toBe(200)
    expect(body).toEqual(
      expect.objectContaining({ modified: expect.any(Boolean) })
    )
  })
})

