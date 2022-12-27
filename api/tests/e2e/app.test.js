const axios = require('axios')

const { knex, migrate } = require('../../src/database')
const { clearMovieTable } = require('../../tests/integration/repositories/helpers')
const { rest, server, mockTheMovieDbCall } = require('../integration/services/get-movies/adapters/helpers')

const API_URL = process.env.API_URL || 'http://localhost:3000'

jest.setTimeout(20000)

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
  clearMovieTable()
    .finally(() => {
      done()
    })
})

describe('get /movies', () => {
  it('should return all movies from database', async () => {
    await knex('movie').insert([
      { id: 1, title: 'Black Panther', description: 'bp', director: 'bp', producer: 'bp', banner: 'bp', poster: 'bp', originalId: '1' },
      { id: 2, title: 'Top Gun', description: 'tg', director: 'tg', producer: 'tg', banner: 'tg', poster: 'tg', originalId: '2' },
    ])
    const { status, data: body } = await axios.get(`${API_URL}/movies`)
    expect(status).toBe(200)
    expect(body).toEqual(
      expect.objectContaining({
        movies: expect.any(Array),
        total: expect.any(Number),
      })
    )
    expect(body.movies).toHaveLength(2)
  })
})

describe('get /update', () => {
  beforeAll(() => {
    server.listen({
      onUnhandledRequest: 'warn'
    })
  })

  beforeEach(() => {
    server.resetHandlers()
  })

  afterAll(() => {
    server.close()
  })

  it('should retrieve data from remote api', async () => {
    mockTheMovieDbCall()

    const { status, data: body } = await axios.get(`${API_URL}/update`)

    expect(status).toBe(200)
    expect(body).toEqual(
      expect.objectContaining({ modified: expect.any(Boolean) })
    )
  })

  it('should avoid error during a second update request', async () => {
    mockTheMovieDbCall()

    const { status: s1, data: b1 } = await axios.get(`${API_URL}/update`)
    expect(s1).toBe(200)
    expect(b1).toStrictEqual({ modified: true })

    const { status: s2, data: b2 } = await axios.get(`${API_URL}/update`)
    expect(s2).toBe(200)
    expect(b2).toStrictEqual({ modified: false })
  })
})

