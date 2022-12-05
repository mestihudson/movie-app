const useCase = require('../usecases/update-base')

module.exports = (req, res) => {
  return useCase()
    .then((output) => {
      return res.json(output)
    })
}
