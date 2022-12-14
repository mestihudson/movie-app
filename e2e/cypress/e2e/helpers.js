const https = require('../../../api/src/infra/http-request/adapters/https')
const { migrate, knex } = require('../../../api/src/database')
const { clearMovieTable } = require('../../../api/tests/integration/repositories/helpers')

const cleanDatabase = async () => {
  try {
    await migrate()
    await clearMovieTable()
    const ok = true
    return Promise.resolve({ ok })
  } catch (error) {
    return Promise.resolve({ error })
  }
}

const getTitleOfFirstCurrentMovies = () => {
  return new Promise(async (resolve) => {
    try {
      const api_key = process.env.TMDB_API_KEY
      const url = 'https://api.themoviedb.org/4/list/1'
      const { data } = await https({ url, params: { api_key } })
      const [{ title }] = data.results
      return resolve({ title })
    } catch (error) {
      return resolve({ error })
    }
  })
}

const seedPaginatedScenario = async () => {
  try {
    await cleanDatabase()
    const movies = new Array(55)
      .fill(0)
      .map((e, index) => {
        const id = index + 1
        const title = `title-${id}`
        const description = `description-${id}`
        const director = `director-${id}`
        const producer = `producer-${id}`
        const banner = `banner-${id}`
        const poster = `poster-${id}`
        const originalId = `originalId-${id}`
        return {
          id, title, description, director, producer, banner, poster, originalId
        }
      })
    await knex('movie')
      .insert(movies)
      .then((result) => {
        console.log(result)
      })
    const ok = true
    return Promise.resolve({ ok })
  } catch (error) {
    return Promise.resolve({ error })
  }
}

module.exports = { cleanDatabase, getTitleOfFirstCurrentMovies, seedPaginatedScenario }
