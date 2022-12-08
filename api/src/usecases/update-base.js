module.exports = ({
    getMovies = require('../services/get-movies'),
    saveMovies = require('../repositories/save-movies'),
    removeAlreadyExisting = require('../repositories/remove-already-existing')
  } = {}) => {
  return getMovies().then((movies) => {
    return removeAlreadyExisting(movies)
      .then((remaining) => {
        return saveMovies(remaining)
          .then((result) => {
            const modified = result.length > 0
            return { modified }
          })
      })
  })
}
