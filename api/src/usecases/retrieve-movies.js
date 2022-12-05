module.exports = ({
    getMovies = require('../repositories/get-movies')
  } = {}) => {
  return getMovies()
}
