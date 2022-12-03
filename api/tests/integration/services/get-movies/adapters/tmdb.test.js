const { rest, server, mockTheMovieDbCall } = require('./helpers')

const getMovies = require('../../../../../src/services/get-movies/adapters/tmdb')

beforeAll(() => {
  server.listen()
})

beforeEach(() => {
  server.resetHandlers()
})

afterAll(() => {
  server.close()
})

it('should retrieve data from tmdb api', async () => {
  const pages = 1
  mockTheMovieDbCall(pages)

  const movies = await getMovies()

  expect(movies).toHaveLength(pages)
})

it('should call tmdb api such times as total pages is', async () => {
  const pages = 3
  mockTheMovieDbCall(pages)

  const movies = await getMovies()

  expect(movies).toHaveLength(pages)
})

it('should retrieve data about director and producer', async () => {
  mockTheMovieDbCall()

  const movies = await getMovies()

  expect(movies).toEqual([
    expect.objectContaining({
      director: expect.any(String),
      producer: expect.any(String),
    })
  ])
})
