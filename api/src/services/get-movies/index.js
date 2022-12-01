module.exports = ({
    adapter = require('./adapters/ghibli')
  } = {}) => {
    return adapter()
}
