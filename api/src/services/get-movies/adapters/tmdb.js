const api_key = process.env.TMDB_API_KEY

const filterReduce = (all) => {
  return all
    .filter(({ media_type }) => media_type === 'movie')
    .map(({
      title, overview: description, backdrop_path: banner, poster_path: poster,
      id: originalId
    }) => {
    return {
      title, originalId, banner, poster, description
    }
  })
}

const addDirectorAndProducer = async (movies, doGetRequest) => {
  let resultMovies = []
  for (let movie of movies) {
    const url = `https://api.themoviedb.org/3/movie/${movie.originalId}/credits`
    const params = { api_key }
    const { data: credits } = await doGetRequest({ url, params })
    resultMovies.push({
      ...movie,
      director: credits.crew.filter(({ job }) => job === 'Director')
        .map(({ name }) => name).join(', '),
      producer: credits.crew.filter(({ job }) => job === 'Producer')
        .map(({ name }) => name).join(', '),
    })
  }
  return resultMovies
}

module.exports = async ({
    doGetRequest = require('../../../infra/http-request/adapters/axios')
  } = {}) => {
  const url = 'https://api.themoviedb.org/4/list/1'
  const params = { api_key }
  const { data: first } = await doGetRequest({ url, params })
  let movies = [ ...first.results ]
  if (first.total_pages > 1) {
    for (let page = 2; page <= first.total_pages; page++) {
      const { data: current } = await doGetRequest({
        url, params: { ...params, page }
      })
      movies = [ ...movies, ...current.results ]
    }
  }
  return Promise.resolve(
    await addDirectorAndProducer([ ...filterReduce(movies) ], doGetRequest)
  )
}
