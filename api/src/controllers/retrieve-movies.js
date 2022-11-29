const useCase = require('../usecases/retrieve-movies')

module.exports = (req, res) => {
  useCase()
    .then((movies) => {
      res.json(movies)
    })
}
