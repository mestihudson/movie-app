module.exports = ({
    getMovies = require('../services/get-movies'),
    saveMovies = require('../repositories/save-movies')
  } = {}) => {
  return getMovies().then((movies) => {
    return saveMovies(movies)
      .then((result) => {
        return { modified: result.length > 0 }
      })
  })
}
