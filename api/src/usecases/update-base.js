module.exports = ({
    getMovies = require('../services/get-movies'),
    saveMovies = require('../repositories/save-movies')
  } = {}) => {
  return getMovies().then((movies) => saveMovies(movies))
}
