module.exports = ({
    adapter = require('./adapters/tmdb')
  } = {}) => {
    return adapter()
}
