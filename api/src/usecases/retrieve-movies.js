module.exports = ({
    page = 1,
    getMovies = require('../repositories/get-movies')
  } = {}) => {
  page = page < 1 ? 1 : page
  const offset = page - 1
  const size = 10
  return getMovies()
    .then((movies) => {
      return Promise.resolve({
        movies: movies.slice(offset * size, page * size),
        total: movies.length
      })
    })
}
