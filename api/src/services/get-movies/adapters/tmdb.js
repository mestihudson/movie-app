const axios = require('axios')

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

const addDirectorAndProducer = async (movies) => {
  let resultMovies = []
  for (let movie of movies) {
    const { data: credits } = await axios
      .get(
        `https://api.themoviedb.org/3/movie/${movie.originalId}/credits`,
        { api_key }
      )
    resultMovies.push({
      ...movie,
      director: credits.crew.filter(({ job }) => job === 'Director')
        .map(({ name }) => name).join(', '),
      producer: credits.crew.filter(({ job }) => job === 'Producer')
        .map(({ name }) => name).join(', '),
    })
  }
  console.log(resultMovies)
  return resultMovies
}

module.exports = async () => {
  const { data: first } = await axios.get('https://api.themoviedb.org/4/list/1', { api_key })
  let movies = [ ...first.results ]
  if (first.total_pages > 1) {
    for (let page = 2; page <= first.total_pages; page++) {
      const { data: current } = await axios
        .get('https://api.themoviedb.org/4/list/1', { api_key, page })
      movies = [ ...movies, ...current.results ]
    }
  }
  return Promise.resolve(
    await addDirectorAndProducer([ ...filterReduce(movies) ])
  )
}
