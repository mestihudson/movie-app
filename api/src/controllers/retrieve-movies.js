const useCase = require('../usecases/retrieve-movies')

module.exports = (req, res) => {
  const { page } = req.query
  useCase({ page })
    .then((movies) => {
      res.json(movies)
    })
}
