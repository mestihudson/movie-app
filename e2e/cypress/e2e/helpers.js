const https = require('../../../api/src/infra/http-request/adapters/https')
const { migrate } = require('../../../api/src/database')
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

module.exports = { cleanDatabase, getTitleOfFirstCurrentMovies }
